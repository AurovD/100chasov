import {FC} from "react";
import clsx from "clsx";
import styles from "../Button/Button.module.scss";
import Button, {ButtonProps} from "../Button";

const BannerButton: FC<ButtonProps> = (props) => (
    <Button {...props} className={clsx(styles.primary, props.className)} />
);
const PrimaryButton: FC<ButtonProps> = (props) => (
    <Button {...props} className={clsx(styles.primary, props.className)} />
);

const SecondaryButton: FC<ButtonProps> = (props) => (
    <Button {...props} className={clsx(styles.secondary, props.className)} />
);
//
const FullWidthButton: FC<ButtonProps> = (props) => (
    <Button {...props} className={clsx(styles.fullWidth, props.className)} />
);
//
// // Экспортируем все компоненты как часть Button
export default Object.assign({
    Primary: PrimaryButton,
    Secondary: SecondaryButton,
    FullWidth: FullWidthButton,
    BannerButton: BannerButton
});
