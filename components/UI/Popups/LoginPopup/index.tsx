import React from "react";
import { useForm } from "@tanstack/react-form";
import * as Yup from "yup";
import { MyTextInput } from "components/UI/MyTextInput";
import Button from "../../Buttons/Button";

const LoginPopup: React.FC = () => {
    const form = useForm({
        defaultValues: {
            login: "",
        },
        onSubmit: async ({ value }) => {
            console.log(value.login);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="d-flex flex-column align-items-center form"
        >
            <form.Field
                name="login"
                validators={{
                    onChange: (value) => {
                        try {
                            Yup.string()
                                .required("Обязательное поле")
                                .min(6, "Должно быть не менее 6 символов")
                                .matches(/^[a-zA-Z0-9]{6,}$/, "Только латинские буквы и цифры")
                                .validateSync(value.value);
                            return undefined;
                        } catch (err: any) {
                            return err.message;
                        }
                    },
                }}
            >
                {(field) => (
                    <label htmlFor="login" title="Введите имя нового пользователя" className="label">
                        <MyTextInput field={field} name="login" />
                        {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                            <div className="error">{field.state.meta.errors[0]}</div>
                        )}
                    </label>

                )}
            </form.Field>


            <Button type="submit">Отправить</Button>
        </form>
    );
};

export default LoginPopup;
