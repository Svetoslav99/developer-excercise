import React from 'react';
import Head from 'next/head';

import { Cart } from '../components';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Cart</title>
                <meta name='description' content='Add as many products as you need and checkout!' />
            </Head>
            <Cart />
        </>
    );
};
export default Index;
