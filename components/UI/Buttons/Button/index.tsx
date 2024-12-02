import clsx from "clsx";
import styles from "./Button.module.scss";
import {FC, MouseEventHandler} from "react";
import login from "../../../Forms/Login";

export interface ButtonProps {
    children: React.ReactNode;
    action?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({children, action, className}) => {
    return (
        <button className={clsx(styles.button, className && styles[className])} onClick={action}>
            {children}
        </button>
    )
}

export default Button;
