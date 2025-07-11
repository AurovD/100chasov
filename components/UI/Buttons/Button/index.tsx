import clsx from "clsx";
import styles from "./Button.module.scss";
import {FC, MouseEventHandler} from "react";

export interface ButtonProps {
    children: React.ReactNode;
    action?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           className,
                                           action,
                                           type = "button",
                                           disabled = false,
                                           children,
                                       }) => {
    const combinedClassName = clsx(
        styles.button,
        className && styles[className]
    );

    return (
        <button
            className={combinedClassName}
            onClick={action}
            type={type}
            disabled={disabled} // <-- сюда
        >
            {children}
        </button>
    );
};


// Button.BannerButton = function BannerButton({ ...props }: ButtonProps) {
//     const bannerClass = clsx(styles.bannerButton, props.className); // Добавляем уникальный стиль
//     return <Button {...props} className={bannerClass} />;
// };

export default Button;


//     = (props) => (
//     <Button {...props} className={clsx(styles.primary, props.className)} />
// );
// const PrimaryButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.primary, props.className)} />
// );
//
// const SecondaryButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.secondary, props.className)} />
// );
// //
// const FullWidthButton: FC<ButtonProps> = (props) => (
//     <Button {...props} className={clsx(styles.fullWidth, props.className)} />
// );