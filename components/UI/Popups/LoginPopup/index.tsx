
import React from "react";
import { useForm } from '@tanstack/react-form';
import * as Yup from 'yup';
import { MyTextInput } from "components/UI/Input";
import Button from '../../Buttons/Button';

const LoginPopup: React.FC = () => {


      const form = useForm({
        defaultValues: {
          login: "",
        },
        onSubmit: async ({ value }) => {
          console.log(value);
          
        },
      });

  return (
    <div className={"d-flex flex-column"}>
         <p>Введите имя нового пользователя</p>

         <form
    //   className={clsx(styles.form)}
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     form.handleSubmit();
    //   }}
    >
      <form.Field
        name="login"
        validators={{
          onChange: (value) => {
            try {
              Yup.string()
                .required("Обязательное поле")
                .validateSync(value.value);
            } catch (error: any) {
              return error.message;
            }
          },
        }}
      >
        {(field) => (
          <label htmlFor="login" title="Ваш логин">
          <input type="text" placeholder="Логин" className="form-control"></input>
          </label>
        )}
      </form.Field>

      <Button type="submit">
        'Отправить'
      </Button>
    </form>
    </div>
  );
};

export default LoginPopup;