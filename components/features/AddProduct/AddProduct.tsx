import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import cn from 'classnames';

import { Form, Button } from '../../';
import { specialDeal } from '../../../enums';
import classes from './addProduct.module.scss';

type ResponseData = {
    message: string;
    error: boolean;
};

const AddProduct: React.FC = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    deal: specialDeal.noDeal
                }}
                onSubmit={async (values, actions) => {
                    if (!values.name) {
                        setError('Name field is required!');
                        return;
                    }

                    if (!values.price) {
                        setError('Price field is required!');
                        return;
                    }

                    if (!values.deal) {
                        setError('Deal is required!');
                        return;
                    }
           
                    const res = await fetch('/api/product', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: values.name,
                            price: values.price,
                            deal: values.deal
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const data: ResponseData = await res.json();

                    if (data.error) {
                        successMessage && setSuccessMessage('');
                        setError(data.message);
                    } else {
                        error && setError('');
                        setSuccessMessage(data.message);
                    }

                    actions.setSubmitting(false);
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <h2 className={classes.title}>Add New Product</h2>

                        <label htmlFor='name' className={classes.label}>
                            Name
                        </label>
                        <Field className={classes.input} name='name' id='name' type='text' placeholder='Apple' />

                        <label htmlFor='price' className={classes.label}>
                            Price
                        </label>
                        <Field
                            className={classes.input}
                            name='price'
                            id='price'
                            type='number'
                            placeholder='1.20 aws'
                            step={0.01}
                            min={0.01}
                        />

                        <label htmlFor='deal' className={classes.label}>
                            Special Deal
                        </label>
                        <Field className={classes.input} as='select' name='deal' id='deal' type='string'>
                            <option value={specialDeal.noDeal}>No Special Offer!</option>
                            <option value={specialDeal.buy2Get3}>Buy 2 get 3!</option>
                            <option value={specialDeal.buy1GetSecondOnHalfPrice}>
                                Buy 1 get second on half price!
                            </option>
                        </Field>

                        <div className={classes['button-container']}>
                            <Button
                                type='submit'
                                classType='primary'
                                value={formik.isSubmitting ? 'Adding Product ...' : 'Add Product'}
                            />
                        </div>

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

export default AddProduct;
