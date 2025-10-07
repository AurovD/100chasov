'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useForm } from '@tanstack/react-form';
import Button from '../../Buttons/Button';
import styles from './CodePopup.module.scss';
import { useUserStore } from '../../../../store/user';
import { useMutation } from '@tanstack/react-query';
import usePopupStore from "../../Popup/store";
import { UserResponse } from 'types/user';
import {fetchRequest} from "../../../../helpers/fetch-request";
import LoginPopup from '../LoginPopup';

const CodePopup: React.FC = () => {
    const codeRequest = useUserStore((state) => state.code);
    // const changeContent = usePopupStore((state) => state.changeContent);
     const closePopup = usePopupStore((state) => state.closePopup);
    const [attempts, setAttempt] = useState<number>(0);
    const [time, setTime] = useState<number>(5);
    const[message, setMessage] = useState<string>('');
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


    const changeContent = usePopupStore((state) => state.changeContent);




    const handleCodeEvent = (data: UserResponse) => {
        if (data.success && data.user.updatedAt === data.user.createdAt) {
            changeContent("Имя нового пользователя", <LoginPopup />);
        } else if (data.success){
             closePopup();
        }
        
        setMessage(data.message || '');
    };

    const mutation = useMutation({
      mutationFn: codeRequest,
      onSuccess: (data: UserResponse) => handleCodeEvent(data),
    });

    const resendCodeMutation = useMutation({
        mutationFn: async () => {
            return fetchRequest<UserResponse>('/user/resend_code', 'GET');
        },
        onSuccess: (data) => {
            if (data.success) {
                setTime(5); // сброс таймера
            } else {
                setMessage(data.message || 'Ошибка при повторной отправке');
            }
        },
        onError: () => {
            setMessage('Ошибка подключения к серверу');
        }
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


    // useEffect(() => {
    //     if (mutation.isPending) {
    //         changeContent('Загрузка', <LoadingPopup />);
    //     }
    // }, [mutation.isPending, changeContent, message]);

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
                <Button className="btn btn-link mt-5"
                        disabled={true} type={"submit"}
                >
                        Отправить код еще раз через {time} секунд
                    </Button>
            ) : (
                <div>
                    <Button
                        className="btn btn-link mt-5"
                        disabled={resendCodeMutation.isPending}
                        action={() => {
                                resendCodeMutation.mutate();
                        }}
                        type={"submit"}
                    >
                        {resendCodeMutation.isPending ? 'Отправка...' : 'Отправить код еще раз'}
                    </Button>
                </div>
            )}
            {message && <p className={clsx(styles.message)}>{message}</p>}
            {mutation.isPending && <p className={clsx(styles.message)}>Отправка...</p>}
        </div>
    );
};

export default CodePopup;
