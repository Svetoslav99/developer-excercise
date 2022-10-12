import React, { useContext, useState } from 'react';
import { Formik, Field } from 'formik';
import cn from 'classnames';

import { Form, Button } from '../../';
import CartContext from '../../../context/cart-context';
import { ProductWithAmount } from '../../../@types/product';
import classes from './deleteProduct.module.scss';

type ResponseData = {
    message: string;
    error: boolean;
};

const DeleteProduct: React.FC = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const cartCtx = useContext(CartContext);

    return (
        <>
            <Formik
                initialValues={{
                    name: null,
                    price: null
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!values.name) {
                        setError('Name field is required!');
                        return;
                    }

                    const res = await fetch('/api/product', {
                        method: 'DELETE',
                        body: JSON.stringify({
                            name: values.name
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const data: ResponseData = await res.json();

                    if (data.error) {
                        successMessage && setSuccessMessage('');
                        setError(data.message);
                    } else {
                        cartCtx.products.forEach((prodObj: ProductWithAmount) =>
                            prodObj.product.name === values.name ? cartCtx.deleteProduct(values.name) : ''
                        );
                        error && setError('');
                        setSuccessMessage(data.message);
                    }

                    setSubmitting(false);
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <h2 className={classes.title}>Delete Product</h2>
                        <label htmlFor='name' className={classes.label}>
                            Name
                        </label>
                        <Field className={classes.input} name='name' id='name' type='text' placeholder='Apple' />
                        <br />

                        <div>
                            <Button
                                type='submit'
                                classType='primary'
                                value={formik.isSubmitting ? 'Deleting Product ...' : 'Delete Product'}
                            />
                        </div>
                        <br />
                        {error && <p className={cn(classes.response, classes['response--error'])}>{error}</p>}
                        {successMessage && (
                            <p className={cn(classes.response, classes['response--success'])}>{successMessage}</p>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default DeleteProduct;
