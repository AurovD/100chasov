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
import {useMutation} from "@tanstack/react-query";


const Login: NextPage = () => {

    const login = useUserStore(state => state.login);

    const mutation = useMutation(
        {
            mutationFn: login,
            onSuccess: (data, variables, context) => {
                console.log(data);
            },
        }
    );

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


export default Login;


//
// import { useMutation } from '@tanstack/react-query';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
//
// const fetchLogin = async (phone: string) => {
//     const response = await fetch("http://localhost:3001/api/user/login", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone }),
//     });
//
//     if (!response.ok) {
//         throw new Error("Failed to login");
//     }
//
//     return response.json(); // Обработка ответа сервера
// };

// const LoginForm = () => {
//     // Используем useMutation для обработки запросов
//     const mutation = useMutation(fetchLogin, {
//         onSuccess: (data) => {
//             console.log('Login successful:', data);
//             // Дополнительная логика, например, сохранение пользователя в глобальное состояние
//         },
//         onError: (error) => {
//             console.error('Error logging in:', error);
//             // Обработка ошибок
//         },
//     });
//
//     return (
//         <Formik
//             initialValues={{
//                 phone: '',
//             }}
//             validationSchema={Yup.object({
//                 phone: Yup.string()
//                     .required("Обязательное поле")
//                     .max(12, "Неверный формат")
//                     .min(12, "Неверный формат"),
//             })}
//             onSubmit={(values) => {
//                 mutation.mutate(values.phone); // Отправляем запрос через мутацию
//             }}
//         >
//             {({ values, handleChange, handleSubmit, errors, touched }) => (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="phone">Phone</label>
//                         <input
//                             id="phone"
//                             name="phone"
//                             type="text"
//                             onChange={handleChange}
//                             value={values.phone}
//                         />
//                         {errors.phone && touched.phone && (
//                             <div style={{ color: 'red' }}>{errors.phone}</div>
//                         )}
//                     </div>
//                     <button type="submit" disabled={mutation.isLoading}>
//                         {mutation.isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>
//             )}
//         </Formik>
//     );
// };
//
// export default LoginForm;
