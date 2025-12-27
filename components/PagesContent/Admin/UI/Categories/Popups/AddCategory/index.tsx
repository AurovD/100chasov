
import React, {useRef, useState} from "react";
import { useForm } from '@tanstack/react-form';
import * as Yup from "yup";
import {MyTextInput} from "../../../../../../UI/MyTextInput";
import Button from "../../../../../../UI/Buttons/Button";
import useCategoriesStore from "../../../../../../../store/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePopupStore from "../../../../../../UI/Popup/store";
import {CategoryType} from "../../../../../../../types/categories";



const AddCategory: React.FC<{parent_id?: string}> = ({parent_id}) => {

    const[message, setMessage] = useState<string>('');

    const addCategory = useCategoriesStore(state => state.addCategory);
    const closePopup = usePopupStore((state) => state.closePopup);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addCategory,
        onSuccess: async (data: CategoryType) => {
            if(data.message) {
                setMessage(data.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["categories"] });
                setMessage("");
                closePopup();
            }
        }
        // onError: () => handleErrorEvent(),
    });

    const form = useForm({
        defaultValues: {
            title: "",
            link: ""
        },
       onSubmit: async ({ value }) => {
   mutation.mutate({
    title: value.title,
       link: value.link,
    parent_id,
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
                            {field.state.meta.errors.map((err, i) => (
                                <div className="error" key={i}>{err}</div>
                            ))}
                        </label>
                    )}
                </form.Field>

                <form.Field
                    name="link"
                    validators={{
                        onChange: (value) => {
                            try {
                                Yup.string()
                                    .required("Обязательное поле")
                                    .min(3, "Должно быть не менее 3 символов")
                                    .matches(
                                        /^[a-z0-9_-]+$/,
                                        "Только латиница, цифры, дефис и подчёркивание"
                                    )
                                    .validateSync(value.value);
                                return undefined;
                            } catch (err: any) {
                                return err.message;
                            }
                        },
                    }}
                >
                    {(field) => (
                        <label htmlFor="link" title="Введите путь категории" className="label">
                            <MyTextInput field={field} name="link"/>
                            {field.state.meta.errors?.length > 0 &&
                                field.state.meta.errors.map((err, i) => (
                                    <div className="error" key={i}>{err}</div>
                                ))
                            }
                        </label>
                    )}
                </form.Field>

                {message ? <Button className="btn btn-link mt-5"
                                    disabled={true} type={"submit"}
                >
                    {message}
                </Button> : <Button type="submit">Отправить</Button>}
            </form>
        </div>
);
};

export default AddCategory;

