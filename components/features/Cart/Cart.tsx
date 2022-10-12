import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { Button } from '../../';
import CartContext from '../../../context/cart-context';
import { specialDeal } from '../../../enums';
import classes from './cart.module.scss';

type ResponseData = {
    error: boolean;
    message: string;
    discount: number;
    totalPrice: number;
};

const Cart: React.FC = () => {
    const cartCtx = useContext(CartContext);
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    const dealView = {
        no_deal: 'No special offer!',
        buy2Get3: 'Buy 2 Get 3!',
        buy1GetSecondOnHalfPrice: 'Buy 1 get second on half price'
    };

    useEffect(() => {
        (async () => {
            
            const res = await fetch('/api/cart', {
                method: 'POST',
                body: JSON.stringify({
                    products: cartCtx.products
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data: ResponseData = await res.json();
            
            if (data.error) {
                setError(data.message);
            } else {
                error && setError('');
                setDiscount(+data.discount.toFixed(2));
                setTotalPrice(+data.totalPrice.toFixed(2));
            }
        })();
    }, [cartCtx]);

    const incrementAmountHandler = (event: React.MouseEvent, productName: string) => {
        cartCtx.incrementProductAmount(productName);
    };

    const decrementAmountHandler = (event: React.MouseEvent, productName: string) => {
        cartCtx.decrementProductAmount(productName);
    };

    const removeProductHandler = (event: React.MouseEvent, productName: string) => {
        cartCtx!.deleteProduct(productName);
    };

    const orderHandler = (e: React.MouseEvent) => {
        // TODO: stipe integration for example
    };

    return (
        <section className={classes.container}>
            <h2 className={classes.title}>Cart</h2>

            <div className={classes.headers}>
                <h3 className={classes.data_container}>Product</h3>
                <h3 className={classes.data_container}>Amount</h3>
                <h3 className={classes.data_container}>Price per item</h3>
                <h3 className={classes.data_container}>Special Deal</h3>
                <h3 className={classes.data_container}>Remove</h3>
            </div>
            <hr className={classes.hr} />

            {cartCtx!.products.map(prodObj => (
                <section key={prodObj.product.id} className={classes.product}>
                    <h3 className={classes.data_container}>{prodObj.product.name}</h3>

                    <div className={cn(classes.amount, classes.data_container)}>
                        <Button
                            type='button'
                            classType='secondary--small'
                            value='−'
                            onClick={event => decrementAmountHandler(event, prodObj.product.name)}
                        />
                        <h3>{prodObj.amount}</h3>
                        <Button
                            type='button'
                            classType='secondary--small'
                            value='+'
                            onClick={event => incrementAmountHandler(event, prodObj.product.name)}
                        />
                    </div>

                    <h3 className={classes.data_container}>{prodObj.product.price} aws</h3>

                    <h3 className={classes.data_container}>
                        {(prodObj.product.deal === specialDeal.noDeal && dealView.no_deal) ||
                            (prodObj.product.deal === specialDeal.buy2Get3 && dealView.buy2Get3) ||
                            (prodObj.product.deal === specialDeal.buy1GetSecondOnHalfPrice &&
                                dealView.buy1GetSecondOnHalfPrice)}
                    </h3>

                    <div className={classes.data_container}>
                        <Image
                            src='/trash.png'
                            alt='Remove button'
                            width={32}
                            height={32}
                            onClick={event => removeProductHandler(event, prodObj.product.name)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </section>
            ))}

            <hr className={classes.hr} />

            <div className={classes.discount_container}>
                <h3 className={classes.data_container}>Discounts:</h3>
                <h3 className={cn(classes.data_container, classes.red)}>- {discount} aws</h3>
            </div>

            <div className={classes.total_price_container}>
                <h2 className={classes.data_container}>Total: </h2>
                <h2 className={classes.data_container}>{totalPrice} aws</h2>
            </div>

            <hr className={classes.hr} />

            <div className={classes.button_container}>
                <Button type='button' classType='primary-big' value='Order' onClick={orderHandler} />
            </div>

            {error && cartCtx.products.length !== 0 && <p className={classes.error}>{error}</p>}
        </section>
    );
};

export default Cart;
