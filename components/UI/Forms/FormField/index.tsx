import React from "react";
import { DeepKeys } from "@tanstack/react-form";
import AddProduct from "../../../PagesContent/Admin/UI/Category/AddProduct";

type FormFieldProps<TFormData> = {
    form: any;
    name: DeepKeys<TFormData>;
    label?: string;
    title?: string;
    validators?: any;
    children: (field: any) => React.ReactNode;
};

function FormField<TFormData>({
                                  form,
                                  name,
                                  label,
                                  title,
                                  validators,
                                  children,
                              }: FormFieldProps<TFormData>) {
    return (
        <form.Field name={name} validators={validators}>
            {(field: any) => (
                <div className="label">
                    {label && (
                        <label htmlFor={String(name)} title={title}>
                            {label}
                        </label>
                    )}

                    {children(field)}

                    {field.state.meta.errors?.map((err: string, i: number) => (
                        <div key={i} className="error">
                            {err}
                        </div>
                    ))}
                </div>
            )}
        </form.Field>
    );
}

export default FormField;