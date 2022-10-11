import React from 'react';
import Head from 'next/head';

import { DeleteProduct } from '../components';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Delete Product</title>
                <meta
                    name='description'
                    content='From this page you can delete a product from the list with products by providing product name.'
                />
            </Head>
            <DeleteProduct />
        </>
    );
};

export default Index;
