import type { NextPage } from 'next'
import React from "react";
import Header from "../../../components/Header";
import Head from "next/head";
import Menu from "../../../components/Menu";
import Categories from "../../../components/PagesContent/Admin/Categories";

const CategoriesPage: NextPage = (props) => {

    return (
        <div className={"wrapper"}>
            <Head>
                <title>Категории</title>
            </Head>
            <Header/>
            <Menu/>
            <Categories/>
        </div>
    )
}

export default CategoriesPage;