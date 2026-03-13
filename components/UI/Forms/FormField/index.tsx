import React from "react";
import { DeepKeys } from "@tanstack/react-form";
import styles from './FormField.module.scss';

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
                <label htmlFor={String(name)} title={title} className="label">
                    {/*{label && (*/}
                    {/*    <label htmlFor={String(name)} title={title}>*/}
                    {/*        {label}*/}
                    {/*    </label>*/}
                    {/*)}*/}

                    {children(field)}

                    {field.state.meta.errors?.map((err: string, i: number) => (
                        <div key={i} className="error">
                            {err}
                        </div>
                    ))}
                </label>
            )}
        </form.Field>
    );
}

export default FormField;