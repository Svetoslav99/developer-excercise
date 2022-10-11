import React, { useState } from 'react';
import { ProductWithAmount } from '../@types/product';
import CartContext from './cart-context';

type Props = {
    children: React.ReactNode;
};

const CartProvider: React.FC<Props> = ({ children }) => {
    const [products, setProducts] = useState<ProductWithAmount[]>([]);   

    const addProduct = (product: ProductWithAmount) => {
        setProducts([...products, product]);
    };

    const deleteProduct = (name: string) => {
        const filteredProducts = products.filter((product: ProductWithAmount) => product.product.name !== name);
        setProducts(filteredProducts);
    };

    const incrementProductAmount = (productName: string) => {
        const foundProductId = products.findIndex((prod: ProductWithAmount) => prod.product.name === productName);
        products[foundProductId].amount += 1;

        setProducts([...products]);
    };

    const decrementProductAmount = (productName: string) => {
        const foundProductId = products.findIndex((prod: ProductWithAmount) => prod.product.name === productName);

        if (products[foundProductId].amount === 1) return;

        products[foundProductId].amount -= 1;

        if (products[foundProductId].amount < 1) {
            deleteProduct(products[foundProductId].product.name);
        } else {
            setProducts([...products]);
        }
    };

    const clearCart = () => {
        setProducts([]);
    };

    const cartContext = {
        products,
        addProduct,
        deleteProduct,
        clearCart,
        incrementProductAmount,
        decrementProductAmount
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
