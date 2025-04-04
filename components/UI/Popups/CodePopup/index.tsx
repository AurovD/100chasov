import React, { useState, useRef, useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";
import Button from "../../Buttons/Button";
import styles from "./CodePopup.module.scss";

const CodePopup: React.FC = () => {
    const [time, setTime] = useState<number>(60);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [time]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: FormikHelpers<{ code: string[] }>['setFieldValue']
    ) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {
            setFieldValue(`code[${index}]`, value);
            if (value && index < 3 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
        setFieldValue: FormikHelpers<{ code: string[] }>['setFieldValue']
    ) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            setFieldValue(`code[${index}]`, '');
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="d-flex flex-column text-center">
            <p>Введите пароль из СМС, присланного на ваш телефон</p>
            <Formik
                initialValues={{ code: ['', '', '', ''] }}
                validationSchema={Yup.object({
                    code: Yup.array().of(Yup.string().matches(/^\d$/, 'Только цифры')),
                })}
                onSubmit={(values) => {
                    const code = values.code.join('');
                    console.log('Submitted code:', code);
                }}
            >
                {({ setFieldValue, value,  }) => (
                    <Form className={clsx(styles.form)}>
                        <div className="d-flex justify-content-center gap-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Field
                                    key={index}
                                    name={`code[${index}]`}
                                    innerRef={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)}
                                    maxLength={1}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index, setFieldValue)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index, setFieldValue)}
                                    className={clsx(styles.input)}
                                />
                            ))}
                        </div>
                        {/*<Button type="submit">Отправить</Button>*/}
                    </Form>
                )}
            </Formik>
            {time > 0 ? (
                <div>Отправить код еще раз через {time} секунд</div>
            ) : (
                <div>
                    <button onClick={() => setTime(60)} className="btn btn-link">
                        Отправить код еще раз
                    </button>
                </div>
            )}
        </div>
    );
};

export default CodePopup;
