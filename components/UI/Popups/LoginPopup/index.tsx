import React, {useState} from "react";
import { useForm } from "@tanstack/react-form";
import * as Yup from "yup";
import { MyTextInput } from "components/UI/MyTextInput";
import Button from "../../Buttons/Button";
import { useMutation } from '@tanstack/react-query';
import {fetchRequest} from "../../../../helpers/fetch-request";
import {UserResponse} from "../../../../types/user";
import {useUserStore} from "../../../../store";
import usePopupStore from "../../Popup/store";

const LoginPopup: React.FC = () => {
    const[message, setMessage] = useState<string>('');
    const closePopup = usePopupStore((state) => state.closePopup);

    const token = useUserStore((state) => state.token);


    const sendLogin = useMutation({
        mutationFn: async (login: string) => {
            return fetchRequest<UserResponse>('/user/login', 'POST', {
                login
            }, token);
        },
        onSuccess: (data) => {
            console.log(data);
            if(data.success){
                closePopup();
            } else {
                setMessage(data.message || "");
            }
        },
        onError: (data) => {
            console.log(data);
            setMessage('Ошибка подключения к серверу');
        }
    });
    const form = useForm({
        defaultValues: {
            login: "",
        },
        onSubmit: async ({ value }) => {
            sendLogin.mutate(value.login)
        },
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}
              className="d-flex flex-column align-items-center form">
            <form.Field
                name="login"
                validators={{
                    onChange: (value) => {
                        try {
                            Yup.string()
                                .required("Обязательное поле")
                                .min(3, "Должно быть не менее 3 символов")
                                .matches(/^[a-zA-Z0-9]{3,}$/, "Только латинские буквы и цифры")
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
                        <MyTextInput field={field} name="login"/>
                        {[...(field.state.meta.errors ?? []), message]
                            .filter(Boolean)
                            .map((err, i) => (
                                <div className="error" key={i}>{err}</div>
                            ))}
                    </label>
                )}
            </form.Field>

            <Button className={"mt-5"} type="submit">Отправить</Button>
        </form>

    );
};

export default LoginPopup;
