import React from 'react';
import { ProductWithAmount } from '../@types/product';

let productsWithAmount: ProductWithAmount[] = [];
const defaultState = {
    products: productsWithAmount,
    addProduct: (product: ProductWithAmount) => {},
    deleteProduct: (name: string) => {},
    incrementProductAmount: (name: string) => {},
    decrementProductAmount: (name: string) => {},
    clearCart: () => {}
};

const CartContext = React.createContext(defaultState);

export default CartContext;
