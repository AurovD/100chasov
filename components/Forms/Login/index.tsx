import type { NextPage } from 'next'
import React from "react";
import styles from "../Forms.module.scss";
import clsx from "clsx";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {User} from "../../../types/user";
import 'react-phone-number-input/style.css'
import PhoneNumberInput from "../../UI/PhoneNumberInput";

const Login: NextPage = () => {
    return (
        <>
            <Formik
                initialValues={{
                    phone: '',
                }}
                validationSchema={Yup.object({

                })}
                onSubmit={(values: User) => {
                    console.log(values);
                }}
            >
                {(formProps) => (
                    <Form className={clsx(styles.form)} >
                        <label htmlFor="phone" title={"Ваш телефон"}>
                            <Field className={clsx(styles.input)} name="phone" component={PhoneNumberInput} />
                            <ErrorMessage name="phone" component="div" className="error" />
                        </label>
                        <button type="submit">Войти</button>
                    </Form>
                )}
        </Formik>
            </>
    )
}


export default Login;