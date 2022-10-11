import React from 'react';
import Head from 'next/head';

import { AllProducts } from '../components';
import { Product } from '../@types/product';

type Props = {
    products: Product[];
};

const Index: React.FC<Props> = ({ products }) => {
    return (
        <>
            <Head>
                <title>All Products</title>
                <meta name='description' content='Here you can find the list with all products that we provide!' />
            </Head>
            <AllProducts products={products} />
        </>
    );
};

export default Index;

export async function getServerSideProps() {
    const res = await fetch(`${process.env.HOST_ADDRESS}/api/all-products`);
    const { data } = await res.json();

    return {
        props: {
            products: data
        }
    };
}
