import React from 'react';
import Link from 'next/link';

import classes from './navbar.module.scss';

const Navbar: React.FC = () => {
    return (
        <nav className={classes.container}>
            <ul className={classes.container__navigation}>
                <li className={classes.item}>
                    <Link href='/delete-product'>Delete Product</Link>
                </li>
                <li className={classes.item}>
                    <Link href='/add-product'>Add Product</Link>
                </li>
                <li className={classes.item}>
                    <Link href='/all-products'>All Products</Link>
                </li>
                <li className={classes.item}>
                    <Link href='/cart'>Cart</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
