import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styles from './Forms.module.scss';
import clsx from 'clsx';
import 'react-phone-number-input/style.css';

import PhoneNumberInput from '../PhoneNumberInput';
import Button from '../../Buttons/Button';
import { useUserStore } from '../../../../store';
import { useMutation } from '@tanstack/react-query';
import usePopupStore from '../../Popup/store';
import ErrorPopup from '../ErrorPopup';
import CodePopup from '../CodePopup';
import LoadingPopup from '../LoadingPopup';

import { useForm } from '@tanstack/react-form';
import * as Yup from 'yup';
import {E164Number} from "libphonenumber-js";

const Phone: NextPage = () => {
    const phoneRequest = useUserStore((state) => state.phone);
    const changeContent = usePopupStore((state) => state.changeContent);

    const handleErrorEvent = () => {
        changeContent('Сервис не отвечает', <ErrorPopup/>);
    };

    const handleCodeEvent = () => {
        changeContent('Подтверждение', <CodePopup />);
    };

    const mutation = useMutation({
        mutationFn: phoneRequest,
        onSuccess: () => handleCodeEvent(),
        onError: () => handleErrorEvent(),
    });

    useEffect(() => {
        if (mutation.isPending) {
            changeContent('Загрузка', <LoadingPopup />);
        }
    }, [mutation.isPending, changeContent]);

    const form = useForm({
        defaultValues: {
            phone: '',
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value.phone);
        },
    });

    return (
        <form
            className={clsx(styles.form)}
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field
                name="phone"
                validators={{
                    onChange: (value) => {
                        try {

                            Yup.string()
                                .required('Обязательное поле')
                                .min(12, 'Неверный формат')
                                .max(12, 'Неверный формат')
                                .validateSync(value.value);
                        } catch (error: any) {
                            return error.message;
                        }
                    },
                }}
            >
                {(field) => (
                    <label htmlFor="phone" title="Ваш телефон">
                        <PhoneNumberInput
                            name="phone"
                            value={field.state.value as E164Number | undefined}
                            onChange={(val) => field.handleChange(val ?? '')}
                            className={clsx(styles.input)}
                        />
                        {field.state.meta.errors?.[0] && (
                            <div className={clsx(styles.error)}>{field.state.meta.errors[0]}</div>
                        )}
                    </label>
                )}
            </form.Field>


            <Button type="submit" disabled={mutation.isPending}>Войти</Button>
        </form>
    );
};

export default Phone;
