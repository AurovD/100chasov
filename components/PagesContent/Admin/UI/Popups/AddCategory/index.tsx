
import React, {useRef, useState} from "react";
import { useForm } from '@tanstack/react-form';
import * as Yup from "yup";
import {MyTextInput} from "../../../../../UI/MyTextInput";
import Button from "../../../../../UI/Buttons/Button";
import useCategoriesStore from "../../../../../../store/categories";
import {useMutation} from "@tanstack/react-query";
import {useUserStore} from "../../../../../../store/user";

const AddCategory: React.FC = () => {

    const[message, setMessage] = useState<string>('');

    const addCategory = useCategoriesStore(state => state.addCategory);



    const mutation = useMutation({
        mutationFn: addCategory,
        // onSuccess: (data: UserResponse) => handleCodeEvent(data),
        // onError: () => handleErrorEvent(),
    });

    const form = useForm({
        defaultValues: {
            title: "",
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value.title);
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
                            {[...(field.state.meta.errors ?? []), message]
                                .filter(Boolean)
                                .map((err, i) => (
                                    <div className="error" key={i}>{err}</div>
                                ))}
                        </label>
                    )}
                </form.Field>

                <Button type="submit">Отправить</Button>
            </form>
        </div>
);
};

export default AddCategory;

