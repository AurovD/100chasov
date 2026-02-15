import React from "react";
import type { NextPage } from "next";
import { useForm } from "@tanstack/react-form";
import * as Yup from "yup";
import { MyTextInput } from "../../../../../UI/Forms/MyTextInput";
import Button from "../../../../../UI/Buttons/Button";
import Dropzone from "../../../../../UI/Dropzone/Dropzone";
import FormField from "../../../../../UI/Forms/FormField";
import yupValidator from "../../../../../UI/Forms/Validator";

const AddProduct: NextPage = () => {
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: "",
            count: "",
            ean: "",
            images: [] as File[],
        },
        onSubmit: async ({ value }) => {
            console.log("submit", value);
        },
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
                <FormField
                    form={form}
                    name="title"
                    label="Название"
                    validators={yupValidator(
                        Yup.string()
                            .required("Обязательное поле")
                            .min(3, "Минимум 3 символа")
                    )}
                >
                    {(field) => <MyTextInput field={field} name="title" />}
                </FormField>

                <FormField
                    form={form}
                    name="description"
                    label="Описание"
                >
                    {(field) => (
                        <textarea
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                    )}
                </FormField>

                <FormField
                    form={form}
                    name="price"
                    label="Цена"
                    validators={yupValidator(Yup.string().required("Обязательное поле"))}
                >
                    {(field) => (
                        <MyTextInput field={field} name="price" type="number" />
                    )}
                </FormField>

                <FormField
                    form={form}
                    name="count"
                    label="Количество"
                    validators={yupValidator(Yup.string().required("Обязательное поле"))}
                >
                    {(field) => (
                        <MyTextInput field={field} name="count" type="number" />
                    )}
                </FormField>

                <FormField
                    form={form}
                    name="ean"
                    label="EAN"
                    validators={yupValidator(Yup.string().required("Обязательное поле"))}
                >
                    {(field) => <MyTextInput field={field} name="ean" />}
                </FormField>

                <FormField form={form} name="images">
                    {(field) => (
                        <Dropzone
                            value={field.state.value}
                            onChange={(files) => field.handleChange(files)}
                        />
                    )}
                </FormField>

                <Button type="submit">Отправить</Button>
            </form>
        </div>
    );
};

export default AddProduct;

