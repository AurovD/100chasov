import type { NextPage } from "next";
import React, {useState} from "react";
import { useForm } from "@tanstack/react-form";
import * as Yup from "yup";
import { MyTextInput } from "../../../../../UI/MyTextInput";
import Button from "../../../../../UI/Buttons/Button";
import Dropzone from "../../../../../UI/Dropzone/Dropzone";

const AddProduct: NextPage = () => {

    const[message, setMessage] = useState<string>('');

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            link: "",
            price: "",
            count: "",
            ean: "",
            images: [] as File[],
        },
        // onSubmit: async ({ value }) => {
        //     console.log("submit", value);
        // },
    });

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="d-flex flex-column form"
        >
          <form.Field
            name="title"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label
                htmlFor="title"
                title="Введите название категории"
                className="label"
              >
                <MyTextInput field={field} name="title" />
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="description"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label
                htmlFor="description"
                title="Введите описание"
                className="label"
              >
                <textarea></textarea>
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="link"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label
                htmlFor="link"
                title="Введите название ссылки"
                className="label"
              >
                <MyTextInput field={field} name="link" />
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="price"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label htmlFor="price" title="Введите цену" className="label">
                <MyTextInput field={field} name="price" type={"number"} />
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="count"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label
                htmlFor="count"
                title="Введите количество"
                className="label"
              >
                <MyTextInput field={field} name="count" type={"number"} />
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="ean"
            validators={{
              onChange: (value) => {
                try {
                  Yup.string()
                    .required("Обязательное поле")
                    .min(3, "Должно быть не менее 3 символов")
                    .validateSync(value.value);
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field) => (
              <label htmlFor="ean" title="Введите EAN товара" className="label">
                <MyTextInput field={field} name="ean" type={"text"} />
                {field.state.meta.errors?.length ? (
                  field.state.meta.errors.map((err, i) => (
                    <div className="error" key={i}>
                      {err}
                    </div>
                  ))
                ) : message ? (
                  <div className="error">{message}</div>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field name="images">
            {(field) => (
              <label className="label">
                <Dropzone
                  value={field.state.value}
                  onChange={(files) => {
                      console.log(files);
                    return field.handleChange(files);
                  }}
                />

                {field.state.meta.errors?.map((err, i) => (
                  <div key={i} className="error">
                    {err}
                  </div>
                ))}
              </label>
            )}
          </form.Field>

          <Button type="submit">Отправить</Button>
        </form>
      </div>
    );
};

export default AddProduct;
