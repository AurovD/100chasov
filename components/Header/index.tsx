import type { NextPage } from 'next'
import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from 'next/link';
import Button from "../UI/Buttons/Button";
import React, { useEffect } from "react";
import usePopupStore from "../UI/Popup/store";
import Phone from "../UI/Popups/Phone";
import { useUserStore } from 'store';

const Header: NextPage = () => {

    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);


    const [user, setUser] = React.useState({});

    const userState = useUserStore((state) => state.user);


    useEffect(() => {
        console.log(userState);
        setUser(userState);
        
    }, [userState]);

    

    const phone = <Phone/>

    const handlePhoneEvent = () => {
        openPopup();
        changeContent("Вход", phone);
    };

    return (
        <div className={clsx("wrapper d-flex justify-content-between align-items-center", styles.header)}>
            <Link href="/" className={clsx(styles.logo)}>
                <img src="assets/logo.svg" alt="100chasov"/>
            </Link>
            <Link className={clsx(styles.logo_mobile)} href="/">
                <img src="assets/logo_mobile.svg" alt="100chasov"/>
            </Link>
            <div className={clsx("d-flex justify-content-between align-items-center", styles.auth)}>
                <Button action={handlePhoneEvent}>Вход</Button>
            </div>
        </div>
    )
}

export default Header;
