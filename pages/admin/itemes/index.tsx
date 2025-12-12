import type { NextPage } from 'next'
import React from "react";
import Header from "../../../components/Header";
import Head from "next/head";

const ItemsPage: NextPage = (props) => {

    return (
        <div className={"wrapper"}>
            <Head>
                <title>Toвары</title>
            </Head>
            <Header/>
            </div>
    )
}

export default ItemsPage;