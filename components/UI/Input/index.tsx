import {useField} from "formik";
import {FC, useMemo, useState} from "react";
import styles from './TextInput.module.scss';
import clsx from "clsx";

interface Interface {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}

// const toggleOnFocus = (initialState = false) => {
//     const [show, toggle] = useState(initialState);
//
//     const eventHandlers = useMemo(() => ({
//         onFocus: () => toggle(true),
//         onBlur: () => toggle(false),
//     }), []);
//
//     return [show, eventHandlers];
// }

export const MyTextInput: FC<Interface> = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    // const [show, eventHandlers] = toggleOnFocus();

    return (
        <div className={clsx('relative', styles.form_input)}>
            <label htmlFor={props.name} className={clsx("absolute label")}>{label}</label>
            <input {...field}
                   name={props.name}
                   type={props.type}
                   onChange={event => {
                       helpers.setValue(event.target.value);
                   }}

                /*{{...(eventHandlers as object)}}*/
            />
            {/*{meta.touched && meta.error ? (*/}
            {/*    <div className={clsx("absolute error")}>{meta.error}</div>*/}
            {/*) : null}*/}
        </div>
    );
};