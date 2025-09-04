
import {FC} from "react";
import styles from './TextInput.module.scss';
import clsx from "clsx";
import {InputProps} from "../../../types/ui";

export const MyTextInput: FC<InputProps> = ({ label, ...props }) => {

    return (
        <div className={clsx('relative', styles.form_input)}>

        </div>
    );
};