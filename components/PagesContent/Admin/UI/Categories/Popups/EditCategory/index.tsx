
import React, {useState} from "react";
import Button from "../../../../../../UI/Buttons/Button";
import {fetchRequest} from "../../../../../../../helpers/fetch-request";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useUserStore} from "../../../../../../../store/user";
import usePopupStore from "../../../../../../UI/Popup/store";
import {useForm} from "@tanstack/react-form";
import * as Yup from "yup";
import {MyTextInput} from "../../../../../../UI/Forms/MyTextInput";



const EditCategory: React.FC<{category_id: string, title: string}> = ({ category_id, title }) => {

    const[message, setMessage] = useState<string>('');
    const token = useUserStore(state => state.token);
    const closePopup = usePopupStore((state) => state.closePopup);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (queryClient: { title: string }): Promise<{     success: boolean;     message: string; }> => {
            console.log(queryClient);
            return await fetchRequest(`/admin/categories/patch?id=${category_id}`, "PATCH", queryClient, token);
        },
        onSuccess: async (data: {success: boolean, message: string}) => {
            console.log(data);
            if(!data.success){
                setMessage(data.message);
            } else {
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                setMessage("");
                closePopup();
            }
            // await queryClient.invalidateQueries({ queryKey: ["categories"] });
            // setMessage("Категория успешно изменена");
            // closePopup();
        }
        // onError: () => handleErrorEvent(),
    });

    const form = useForm({
        defaultValues: {
            title: title,
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            mutation.mutate({
                title: value.title,
            });
        },
    });

    return (
        <div className={"d-flex flex-column"}>
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}  className="d-flex flex-column align-items-center form">
                <form.Field
                    name="title"
                    validators={{
                        onChange: (value) => {
                            try {
                                Yup.string()
                                    .required("Обязательное поле")
                                    .min(3, "Должно быть не менее 3 символов")
                                    .validateSync(value.value);
                                return undefined;
                            } catch (err: any) {
                                return err.message;
                            }
                        },
                    }}
                >
                    {(field) => (
                        <label htmlFor="title" title="Введите название категории" className="label">
                            <MyTextInput field={field} name="title"/>
                            {field.state.meta.errors?.length ? (
                                field.state.meta.errors.map((err, i) => (
                                    <div className="error" key={i}>{err}</div>
                                ))
                            ) : message ? (
                                <div className="error">{message}</div>
                            ) : null}
                        </label>
                    )}
                </form.Field>

                <Button type="submit">Отправить</Button>
            </form>
        </div>
    );

};

export default EditCategory;