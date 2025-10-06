import type { NextPage } from 'next'
import React from "react";
import Menu from "../../Menu";
import Items from "./Items";

const Admin: NextPage = (props) => {

    return (
        <div>
            <Menu/>
            <Items/>
        </div>
    )
}

export default Admin;