import {useEffect, useState} from "react";

export const usePopup = () => {
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        console.log(modalActive)
    }, [modalActive]);

    return [modalActive, setModalActive];
}