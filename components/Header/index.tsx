import type { NextPage } from 'next'
import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from 'next/link';
import Button from "../UI/Buttons/Button";
import React from "react";
import usePopupStore from "../UI/Popup/store";
import Login from "../Forms/Login";
import {Popup} from "../UI/Popup";

const Header: NextPage = () => {

    // const popupChange = usePopupStore((state) => state.changeStatus);
    // const popup = usePopupStore((state) => state.status);
    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);

    const login = <Login/>

    const handleLoginEvent = () => {
        openPopup();
        changeContent("Вход", login);
    };

    return (
        <div className={clsx("wrapper d-flex justify-content-between align-items-center", styles.header)}>
            <Link href="/">
                <img className={clsx(styles.logo)} src="assets/logo.svg" alt="100chasov"/>
            </Link>
            <Link href="/">
                <img className={clsx(styles.logo_mobile)} src="assets/logo_mobile.svg" alt="100chasov"/>
            </Link>
            <div className={clsx("d-flex justify-content-between align-items-center", styles.auth)}>
                <Button action={handleLoginEvent}>Вход</Button>
            </div>
        </div>
    )
}

export default Header;