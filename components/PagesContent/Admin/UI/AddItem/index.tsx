import React from "react";
import styles from "./AddItem.module.scss";
import clsx from "clsx";
import usePopupStore from "../../../../UI/Popup/store";
import AddCategory from "../Popups/AddCategory";

const AddItem: React.FC = () => {
    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);



    const addCategory = <AddCategory/>

    const handleAddEvent = () => {
        openPopup();
        changeContent("Добавить категорию", addCategory);
    };


    return (
        <div className={clsx(styles.add_item, "d-flex align-items-center")}
        onClick={handleAddEvent}>
            <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 16 16"
                className="plusFillSmall"
                style={{
                    width: 16,
                    height: 16,
                    display: "block",
                    fill: "#a8a49c",
                    flexShrink: 0,
                    marginTop: 1
                }}
            >
                <path d="M8 2.65a.75.75 0 0 1 .75.75v3.85h3.85a.75.75 0 0 1 0 1.5H8.75v3.85l-.004.077a.75.75 0 0 1-1.492 0L7.25 12.6V8.75H3.4a.75.75 0 0 1 0-1.5h3.85V3.4A.75.75 0 0 1 8 2.65"></path>
            </svg>
            <p>Добавить категорию</p>
        </div>
    )
}

export default AddItem;
