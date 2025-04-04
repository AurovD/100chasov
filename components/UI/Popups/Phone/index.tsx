import type { NextPage } from 'next'
import React, {useEffect} from "react";
import styles from "./Forms.module.scss";
import clsx from "clsx";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import 'react-phone-number-input/style.css'
import PhoneNumberInput from "../PhoneNumberInput";
import Button from '../../Buttons/Button';
import {useUserStore} from "../../../../store";
import {useMutation} from "@tanstack/react-query";
import usePopupStore from "../../Popup/store";
import ErrorPopup from "../ErrorPopup";
import CodePopup from "../CodePopup";
import LoadingPopup from "../LoadingPopup";


const Phone: NextPage = () => {

    const phone = useUserStore(state => state.phone);



    const changeContent = usePopupStore((state) => state.changeContent);

    const error = <ErrorPopup/>

    const handleErrorEvent = () => {
        changeContent("Сервис не отвечает", error);
    };
    const code = <CodePopup/>

    const handleCodeEvent = () => {
        changeContent("Подтверждение", code);
    };

    const loading = <LoadingPopup/>

    const mutation = useMutation(
        {
            mutationFn: phone,
            onSuccess: (data, variables, context) => {
                handleCodeEvent();
            },
            onError: (data) => {
                handleErrorEvent();
            }
        }
    );

    useEffect(() => {
        if (mutation.isPending) {
            changeContent("Загрузка", <LoadingPopup />);
        }
    }, [mutation.isPending, changeContent]);

    return (
        <>
            {/*{isPending && changeContent("Загрузка", loading)}*/}
            <Formik
                initialValues={{
                    phone: '',
                }}
                validationSchema={Yup.object({
                    phone: Yup.string().required("Обязательное поле")
                        .max(12, "Неверный формат")
                        .min(12, "Неверный формат")
                })}
                onSubmit={(values: { phone: string }) => {
                    mutation.mutate(values.phone);
                }}
            >
                {(formProps) => {
                    return (
                        <Form className={clsx(styles.form)}>
                            <label htmlFor="phone" title={"Ваш телефон"}>
                                <Field className={clsx(styles.input)} name="phone" component={PhoneNumberInput} />
                                <ErrorMessage name="phone" component="div" className={clsx(styles.error)} />
                            </label>
                            <Button type="submit">Войти</Button>
                        </Form>
                    );
                }}
        </Formik>
            </>
    )
}


export default Phone;
