import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import '../styles/globals.scss';

import { Layout } from '../components';
import CartProvider from '../context/CartProvider';

const App = ({ Component, pageProps }: AppProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <>
            <CartProvider>
                {loading ? (
                    <Layout>
                        <h1>Loading...</h1>
                    </Layout>
                ) : (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                )}
            </CartProvider>
        </>
    );
};

export default App;
