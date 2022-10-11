import React, { useContext } from 'react';
import cn from 'classnames';

import { Button } from '../../';
import { specialDeal } from '../../../enums';

import CartContext from '../../../context/cart-context';
import { Product, ProductWithAmount } from '../../../@types/product';
import classes from './allProducts.module.scss';

type Props = {
    products: Product[];
};

const AllProducts: React.FC<Props> = ({ products }) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (event: React.MouseEvent, product: Product) => {
        const newProduct: ProductWithAmount = { product, amount: 1 };

        cartCtx.addProduct(newProduct);
    };

    return (
        <section className={classes.main_container}>
            {products.map((product: Product) => {
                let specialDealClassName = '';
                let specialDealView = '';
                if (product.deal === specialDeal.noDeal) {
                    specialDealClassName = 'container--no_deal';
                    specialDealView = 'No special deal.';
                } else if (product.deal === specialDeal.buy2Get3) {
                    specialDealClassName = 'container--buy_2_get_3';
                    specialDealView = 'Buy 2, get 3!';
                } else if (product.deal === specialDeal.buy1GetSecondOnHalfPrice) {
                    specialDealClassName = 'container--buy_1_get_1_half_price';
                    specialDealView = 'Buy 1, get 1 half price!';
                }

                const foundProduct = cartCtx.products.find(
                    (prod: ProductWithAmount) => prod.product.name === product.name
                );

                let isDisabled = false;
                if (foundProduct) {
                    isDisabled = true;
                }

                return (
                    <article className={cn(classes.container, classes[specialDealClassName])} key={product.id}>
                        <h2>{product.name}</h2>
                        <h4>Price: {product.price.toFixed(2)} aws</h4>
                        <h3>{specialDealView}</h3>
                        <Button
                            type='button'
                            classType='secondary'
                            value='Add to cart'
                            onClick={event => addToCartHandler(event, product)}
                            disabled={isDisabled}
                        ></Button>
                    </article>
                );
            })}
        </section>
    );
};

export default AllProducts;
