import React from 'react';
import Head from 'next/head';

import { AddProduct } from '../components';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Add Product</title>
                <meta name='description' content='From this page you can add a new product to the list of products!' />
            </Head>
            <AddProduct />
        </>
    );
};

export default Index;
