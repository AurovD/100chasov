import type { NextPage } from 'next'
import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from 'next/link';
import Button from "../UI/Buttons/Button";
import React, { useEffect } from "react";
import usePopupStore from "../UI/Popup/store";
import Phone from "../UI/Popups/Phone";
import { useUserStore } from '../../store/user';
import {User} from "../../types/user";

const Header: NextPage = () => {

    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);


    // const [user, setUser] = React.useState<User | {}>({});

    const user: User | null = useUserStore((state) => state.user);


    // console.log("header render");

    const phone = <Phone/>

    const handlePhoneEvent = () => {
        openPopup();
        changeContent("Вход", phone);
    };

    return (
      <div
        className={clsx(
          "wrapper d-flex justify-content-between align-items-center",
          styles.header,
        )}
      >
        <Link href="/" className={clsx(styles.logo)}>
          <img src="/assets/logo.svg" alt="100chasov" />
        </Link>
        <Link className={clsx(styles.logo_mobile)} href="/">
          <img src="/assets/logo_mobile.svg" alt="100chasov" />
        </Link>

        {/*{*/}
        {/*    userState?.login ? <div>{"login" in userState && userState?.login ? userState.login  : "User"}</div> :*/}
        <div
          className={clsx(
            "d-flex justify-content-between align-items-center",
            styles.auth,
          )}
        >
          <Button type={"button"} action={handlePhoneEvent}>Вход</Button>
          {/*{user && <Button type={"button"} action={handlePhoneEvent}>Вход</Button>}*/}
          {/*<div>*/}
            <Link href="/admin/categories">
                {user && user?.login && <p>{user?.login}</p>}
            </Link>
          {/*</div>*/}
        </div>
      </div>
    );
}

export default Header;
