import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductWithAmount } from '../../@types/product';
import { specialDeal } from '../../enums';

type Response = {
    message: string;
    error: boolean;
    discount: number;
    totalPrice: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'POST') {
        const data: { products: ProductWithAmount[] } = req.body;

        try {
            let discount = 0;
            let totalPrice = 0;

            const productsBuy2Get3: ProductWithAmount[] = [];
            const productsBuy1GetSecondOnHalfPrice: ProductWithAmount[] = [];
            const productsNoDeal: ProductWithAmount[] = [];

            if (data.products.length === 0) {
                return res.status(200).json({
                    message: 'There are no products in the cart!',
                    error: false,
                    discount,
                    totalPrice: 0
                });
            }

            data.products.forEach((productObj: ProductWithAmount) => {
                if (productObj.product.deal === specialDeal.noDeal) {
                    productsNoDeal.push(productObj);
                }

                if (productObj.product.deal === specialDeal.buy1GetSecondOnHalfPrice) {
                    productsBuy1GetSecondOnHalfPrice.push(productObj);
                }

                if (productObj.product.deal === specialDeal.buy2Get3) {
                    productsBuy2Get3.push(productObj);
                }
            });

            // Buy 2 Get 3 logic
            let productAmountBuy2Get3 = 0;
            productsBuy2Get3.forEach((productObj: ProductWithAmount) => (productAmountBuy2Get3 += productObj.amount));

            if (productAmountBuy2Get3 >= 3) {
                if (productsBuy2Get3.length >= 3) {
                    // only the first 3 product objects in the cart
                    const [firstProductObj, secondProductObj, thirdProductObj] = productsBuy2Get3.sort(
                        (a, b) => a.product.price - b.product.price
                    );

                    totalPrice =
                        (firstProductObj.amount - 1) * firstProductObj.product.price +
                        secondProductObj.amount * secondProductObj.product.price +
                        thirdProductObj.amount * thirdProductObj.product.price;
                } else if (productsBuy2Get3.length == 2) {
                    const [firstProductObj, secondProductObj] = productsBuy2Get3.sort(
                        (a, b) => a.product.price - b.product.price
                    );

                    totalPrice =
                        (firstProductObj.amount - 1) * firstProductObj.product.price +
                        secondProductObj.amount * secondProductObj.product.price;

                    discount += firstProductObj.product.price;
                } else if (productsBuy2Get3.length == 1) {
                    const [firstProductObj] = productsBuy2Get3;
                    totalPrice = (firstProductObj.amount - 1) * firstProductObj.product.price;
                    discount += firstProductObj.product.price;
                }
            } else {
                productsBuy2Get3.forEach(
                    (productObj: ProductWithAmount) => (totalPrice += productObj.amount * productObj.product.price)
                );
            }

            // Buy 1 Get second half price logic
            let productAmountBuy1GetSecondOnHalfPrice = 0;
            productsBuy1GetSecondOnHalfPrice.forEach(
                (productObj: ProductWithAmount) => (productAmountBuy1GetSecondOnHalfPrice += productObj.amount)
            );

            if (productAmountBuy1GetSecondOnHalfPrice >= 2) {
                productsBuy1GetSecondOnHalfPrice.forEach((productObj: ProductWithAmount) => {
                    // for every second item - half price!
                    if (productObj.amount % 2 === 0) {
                        // 2,4,8..
                        totalPrice +=
                            (productObj.amount * (productObj.product.price + productObj.product.price * 0.5)) / 2;

                        discount += (productObj.amount / 2) * (productObj.product.price * 0.5);
                    } else {
                        // 3,5,7 ...
                        totalPrice +=
                            ((productObj.amount - 1) * (productObj.product.price + productObj.product.price * 0.5)) /
                                2 +
                            1 * productObj.product.price;

                        discount += ((productObj.amount - 1) * (productObj.product.price * 0.5)) / 2;
                    }
                });
            } else if (productAmountBuy1GetSecondOnHalfPrice === 1) {
                const [productObj] = productsBuy1GetSecondOnHalfPrice;
                totalPrice += productObj.amount * productObj.product.price;
            }

            // no deal logic
            productsNoDeal.forEach(
                (productObj: ProductWithAmount) => (totalPrice += productObj.amount * productObj.product.price)
            );

            return res.status(200).json({
                message: 'Successfully calculated discount and total price!',
                error: false,
                discount,
                totalPrice
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return res.status(500).json({
                message: `An error occured: ${message}`,
                error: true,
                discount: 0,
                totalPrice: 0
            });
        }
    }

    return res.status(400).json({
        message: 'Request method not supported!',
        error: true,
        discount: 0,
        totalPrice: 0
    });
}
