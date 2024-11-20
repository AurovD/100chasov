import clsx from "clsx";
import styles from "./Button.module.scss";
import {FC, MouseEventHandler} from "react";
import login from "../../../Forms/Login";

interface ButtonProps {
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

// export default Button;



// Button.tsx
// import React, { FC, PropsWithChildren } from 'react';
// import clsx from 'clsx';
// import styles from './Button.module.css'; // CSS-модули для стилей
//
// interface ButtonProps {
//     children: React.ReactNode;
//     onClick?: React.MouseEventHandler<HTMLButtonElement>;
//     className?: string;
// }
//
// // Базовый компонент Button
// const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, onClick, className }) => {
//     return (
//         <button className={clsx(styles.button, className)} onClick={onClick}>
//             {children}
//         </button>
//     );
// };
//
// Варианты кнопок
const BannerButton: FC<ButtonProps> = (props) => (
    <Button {...props} className={clsx(styles.primary, props.className)} />
);
// const PrimaryButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.primary, props.className)} />
// );
//
// const SecondaryButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.secondary, props.className)} />
// );
//
// const FullWidthButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.fullWidth, props.className)} />
// );
//
// // Экспортируем все компоненты как часть Button
export default Object.assign(Button, {
    // Primary: PrimaryButton,
    // Secondary: SecondaryButton,
    // FullWidth: FullWidthButton,
    BannerButton: BannerButton
});
