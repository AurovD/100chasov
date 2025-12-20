import type { NextPage } from 'next'
import React from "react";
import Header from "../../../components/Header";
import Head from "next/head";
import Products from "../../../components/PagesContent/Admin/Products";

const ProductsPage: NextPage = (props) => {

    return (
        <div className={"wrapper"}>
            <Head>
                <title>Toвары</title>
            </Head>
            <Header/>
            products
            {/*<Products/>*/}
            </div>
    )
}

export default ProductsPage;