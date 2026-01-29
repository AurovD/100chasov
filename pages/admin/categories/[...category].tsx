import type { NextPage } from 'next'
import React from "react";
import Header from "../../../components/Header";
import Head from "next/head";
import Category from "../../../components/PagesContent/Admin/Category";
import {useRouter} from "next/router";

const CategoryPage: NextPage = (props) => {

    const router = useRouter();
    const path = router.query.category as string[] | undefined;
    console.log(path);

    return (
        <div className={"wrapper"}>
            <Head>
                <title>Toвары</title>
            </Head>
            <Header/>
            <Category/>
            </div>
    )
}

export default CategoryPage;