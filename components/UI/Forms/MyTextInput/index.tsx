import React from "react";
import styles from "./MyTextInput.module.scss";
import clsx from "clsx";
import { FieldApi } from "@tanstack/react-form";

type SimpleFieldApi = {
    state: {
        value: string;
        meta: {
            errors?: string[];
            visited?: boolean;
        };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
};

type MyTextInputProps = {
    field: SimpleFieldApi;
    name: string;
    type?: string
};

export const MyTextInput: React.FC<MyTextInputProps> = ({ field, name, type = "text" }) => {
    const errors = field.state.meta.errors ?? [];

    return (
      <input
        className={clsx("relative", "input")}
        type={type}
        name={name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        // placeholder={title}
      />
    );
};
