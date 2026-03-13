import type { NextPage } from 'next';
import React, {useState} from 'react';
import styles from './Phone.module.scss';
import clsx from 'clsx';
import 'react-phone-number-input/style.css';
import PhoneNumberInput from '../PhoneNumberInput';
import Button from '../../Buttons/Button';
import { useUserStore } from '../../../../store/user';
import { useMutation } from '@tanstack/react-query';
import usePopupStore from '../../Popup/store';
import ErrorPopup from '../ErrorPopup';
import CodePopup from '../CodePopup';

import { useForm } from '@tanstack/react-form';
import * as Yup from 'yup';
import {E164Number} from "libphonenumber-js";
import {UserResponse} from "../../../../types/user";
import yupValidator from "../../Forms/Validator";
import FormField from "../../Forms/FormField";

const Phone: NextPage = () => {
  const phoneRequest = useUserStore((state) => state.phone);
  const changeContent = usePopupStore((state) => state.changeContent);

  const handleErrorEvent = () => {
    changeContent("Сервис не отвечает", <ErrorPopup />);
  };

  const [message, setMessage] = useState<string>("");

  const handleCodeEvent = (data: UserResponse) => {
    if (data.success) {
      changeContent("Подтверждение", <CodePopup />);
    }
    setMessage(data.message ?? "");
  };

  const mutation = useMutation({
    mutationFn: phoneRequest,
    onSuccess: (data: UserResponse) => handleCodeEvent(data),
    onError: () => handleErrorEvent(),
  });

  const form = useForm({
    defaultValues: {
      phone: "",
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
      <FormField
          form={form}
          name="phone"
          title="Введите номер телефона"
          validators={yupValidator(
              Yup.string()
                  .required("Обязательное поле")
                  .min(12, "Неверный формат")
                  .max(12, "Неверный формат")
          )}
      >
        {(field) =>
            <PhoneNumberInput
                name="phone"
                value={field.state.value as E164Number | undefined}
                onChange={(val) => field.handleChange(val ?? "")}
                className={clsx(styles.input)}
            />
        }
      </FormField>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  );
};

export default Phone;
