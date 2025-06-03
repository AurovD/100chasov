'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useForm } from '@tanstack/react-form';
import Button from '../../Buttons/Button';
import styles from './CodePopup.module.scss';
import { useUserStore } from '../../../../store';
import { useMutation } from '@tanstack/react-query';
import LoadingPopup from "../LoadingPopup";
import usePopupStore from "../../Popup/store";

const CodePopup: React.FC = () => {
    const codeRequest = useUserStore((state) => state.code);
    const changeContent = usePopupStore((state) => state.changeContent);

    const [time, setTime] = useState<number>(15);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


    const mutation = useMutation({
        mutationFn: codeRequest,
    });

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [time]);



    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);


    useEffect(() => {
        if (mutation.isPending) {
            changeContent('Загрузка', <LoadingPopup />);
        }
    }, [mutation.isPending, changeContent]);

    const form = useForm({
        defaultValues: {
            code: ['', '', '', ''],
        },
        // onSubmit: async ({ value }) => {
        //     const code = value.code.join('');
        //     console.log('Submitted code:', code);
        // },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, setValue: (val: string[]) => void, currentValue: string[]) => {
        const val = e.target.value;
        if (/^\d?$/.test(val)) {
            const newCode = [...currentValue];
            newCode[index] = val;
            setValue(newCode);
            if (val && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, setValue: (val: string[]) => void, currentValue: string[]) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            const newCode = [...currentValue];
            newCode[index] = '';
            setValue(newCode);
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="d-flex flex-column text-center">
            <p>Введите пароль из СМС, присланного на ваш телефон</p>

            <form
                className={clsx(styles.form)}
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     form.handleSubmit();
                // }}
            >
                <form.Field
                    name="code"
                    validators={{
                        onChange: (codeArr) => {
                            if(codeArr.value.length === 4 &&
                                codeArr.value.every(char => /^\d$/.test(char))){
                                const code = codeArr.value.join('');
                                mutation.mutate(code);
                            }
                            const hasInvalid = codeArr.value.some((c) => !/^\d?$/.test(c));
                            if (hasInvalid) return 'Только цифры';
                        },
                    }}
                >
                    {(field) => (
                        <div className={clsx(styles.input_group, "d-flex justify-content-between")}>
                            {field.state.value.map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    ref={(el: HTMLInputElement | null) => {inputRefs.current[index] = el;}}
                                    value={field.state.value[index]}
                                    onChange={(e) => handleChange(e, index, field.handleChange, field.state.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index, field.handleChange, field.state.value)}
                                    className={clsx(styles.input)}
                                />
                            ))}
                        </div>
                    )}
                </form.Field>

                {/*<Button type="submit" disabled={time === 0}>*/}
                {/*    Отправить*/}
                {/*</Button>*/}
            </form>

            {time > 0 ? (
                <Button className="btn btn-link" disabled={true}>
                        Отправить код еще раз через {time} секунд
                    </Button>
            ) : (
                <div>
                    <Button className="btn btn-link">
                        Отправить код еще раз
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CodePopup;
