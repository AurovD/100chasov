import type { NextPage } from 'next'
import React from "react";
import styles from "./Items.module.scss";
import clsx from "clsx";
import AddItem from "../UI/AddItem";

const Items: NextPage = (props) => {

    return (
        <div>
            <AddItem/>
        </div>
    )
}

export default Items;