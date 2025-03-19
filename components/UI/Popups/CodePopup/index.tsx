
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import clsx from "clsx";
import styles from "./CodePopup.module.scss";
import Button from "../../Buttons/Button";

const CodePopup: React.FC = () => {

    let [time, setTime] = useState(60);

    useEffect(() => {
        if(time > 0){
            setTimeout(() => setTime(time - 1), 1000);
        }
        return () => {
            clearTimeout(time);
        }
    }, [time]);


    return (
        <div className={"d-flex flex-column text-center"}>
            <p>Введите пароль из СМС, присланного на ваш телефон</p>
            <Formik
                initialValues={{
                    number: ''
                }}
                validationSchema={Yup.object({
                    number: Yup.string()
                })}
                onSubmit={(values: { number: string }) => {
                }}
            >
                {(formProps) => {
                    return (
                        <Form className={clsx(styles.form)}>
                                <Field className={clsx(styles.input)} name="code" type={"number"} />
                                <Field className={clsx(styles.input)} name="code" type={"number"} />
                                <Field className={clsx(styles.input)} name="code" type={"number"} />
                                <Field className={clsx(styles.input)} name="code" type={"number"} />
                                <ErrorMessage name="phone" component="div" className={clsx(styles.error)} />
                            {/*<Button type="submit">Войти</Button>*/}
                        </Form>
                    );
                }}
            </Formik>
            {
                time > 0 ? <div>Отправить код еще раз через {time}</div> : <div>Отправить код еще раз</div>
            }
        </div>
    );
};

export default CodePopup;

