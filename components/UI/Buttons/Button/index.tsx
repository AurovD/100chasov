import clsx from "clsx";
import styles from "./Button.module.scss";
import {ButtonProps} from "../../../../types/ui";

const Button: React.FC<ButtonProps> = ({
                                           className,
                                           action,
                                           type = "button",
                                           disabled = false,
                                           children,
                                       }) => {
    const combinedClassName = clsx(
        styles.button,
        className,
        disabled && styles.disabled
    );

    return (
        <button
            className={combinedClassName}
            onClick={action}
            type={type}
            disabled={disabled} 
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