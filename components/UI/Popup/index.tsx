import React, {FC, useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./Popup.module.scss";
import clsx from "clsx";
import usePopupStore from "./store";


export const Popup = () => {
    const [bodyElement, setBodyElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const body: HTMLElement = document.body;
        if (body) {
            setBodyElement(body);
        }
    }, []);


    const popup = usePopupStore((state) => state.status);
    // const popupChange = usePopupStore((state) => state.changeStatus);
    const closePopup = usePopupStore((state) => state.closePopup);
    const {title, content} = usePopupStore((state) => state.contents);

    const elem = <div className={clsx(styles.popup, popup ? styles.active : null)}>
        <h2 className={clsx(styles.popup_header)}>{title}</h2>
        <div className={clsx(styles.popup_inner)}>
            <div className={clsx(styles.popup_content)}>
                <div className={clsx(styles.popup_content_inner)}>{content}</div>
            </div>
        </div>
        <div className={clsx(styles.popup_close_banner)} onClick={() => closePopup()}></div>
    </div>

    return bodyElement ? createPortal(elem, bodyElement) : null;
}