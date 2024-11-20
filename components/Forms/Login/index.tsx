import type { NextPage } from 'next'
import React from "react";
import styles from "../Forms.module.scss";
import clsx from "clsx";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {User} from "../../../types/user";
import 'react-phone-number-input/style.css'
import PhoneNumberInput from "../../UI/PhoneNumberInput";
import Button from '../../UI/Buttons/Button';
import {useUserStore} from "../../../store";
// import {useMovies} from "../../../store/user";


// async function test ()  {
//     try {
//         await fetch("http://localhost:3001/api/user/test");
//     } catch (e) {
//         console.log(e)
//     }
// }

const Login: NextPage = () => {

    const [login] = useUserStore(state => [state.login]);

    return (
        <>
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
                    // test();
                    login(values.phone, true);
                }}
            >
                {(formProps) => (
                    <Form className={clsx(styles.form)} >
                        <label htmlFor="phone" title={"Ваш телефон"}>
                            <Field className={clsx(styles.input)} name="phone" component={PhoneNumberInput} />
                            <ErrorMessage name="phone" component="div" className={clsx(styles.error)} />
                        </label>
                        <Button>Войти</Button>
                    </Form>
                )}
        </Formik>
            </>
    )
}


export default Login;