import React from 'react';
import Head from 'next/head';

import {signIn} from 'next-auth/react';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Grocery shop</title>
                <meta name='description' content='Eat healthy, live longer!' />
            </Head>
            <h2>
                Welcome to the Shop! Please use the navigation and navigate to 'All Products' page to see what we offer
                :)
            </h2>
        </>
    );
};

export default Index;
