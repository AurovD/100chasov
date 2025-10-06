import type { NextPage } from 'next'
import React from "react";
import Header from "../../components/Header";
import Admin from "../../components/PagesContent/Admin";

const AdminPage: NextPage = (props) => {

    return (
        <div className={"wrapper"}>
            <Header/>
            <Admin/>
        </div>
    )
}

export default AdminPage;