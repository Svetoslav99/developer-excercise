import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { specialDeal } from '../../enums';

const prisma = new PrismaClient();

type ReqBodyPost = {
    name: string;
    price: number;
    deal: specialDeal;
};

type ReqBodyDelete = {
    name: string;
};

type Response = {
    message: string;
    error: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'POST') {
        const data: ReqBodyPost = req.body;

        try {
            if (!data.name) {
                throw new Error('Don`t mess with the product name field, please!');
            }

            if (!data.price) {
                throw new Error('Don`t mess with the price field, please!');
            }

            if (
                data.deal !== specialDeal.buy1GetSecondOnHalfPrice &&
                data.deal !== specialDeal.buy2Get3 &&
                data.deal !== specialDeal.noDeal
            ) {
                throw new Error('Don`t mess with the special deal types, please!');
            }

            await prisma.$connect();
            const productExists = await prisma.product.findUnique({
                where: {
                    name: data.name
                }
            });

            if (productExists) {
                throw new Error('Product with such name already exists.');
            }

            const insertProduct = await prisma.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    deal: data.deal
                }
            });

            if (!insertProduct) {
                throw new Error('Something went wrong while trying to add new product.');
            }

            await prisma.$disconnect();

            return res.status(201).json({
                message: 'Successfully added new product!',
                error: false
            });
        } catch (error) {
            await prisma.$disconnect();

            const message = error instanceof Error ? error.message : String(error);
            return res.status(500).json({
                message: `An error occured: ${message}`,
                error: true
            });
        }
    } else if (req.method === 'DELETE') {
        const data: ReqBodyDelete = req.body;

        try {
            if (!data.name) {
                throw new Error('Don`t mess with the product name field, please!');
            }

            await prisma.$connect();
            const productExists = await prisma.product.findUnique({
                where: {
                    name: data.name
                }
            });

            if (!productExists) {
                await prisma.$disconnect();
                return res.status(409).json({
                    message: `Product with such name "${data.name}" already does not exist.`,
                    error: true
                });
            }

            const deleteProduct = await prisma.product.delete({
                where: {
                    name: data.name
                }
            });

            if (!deleteProduct) {
                throw new Error(`An error occured while trying to delete a product "${data.name}" from the database.`);
            }

            await prisma.$disconnect();

            return res.status(201).json({
                message: `Successfully deleted a product "${data.name}" from the database!`,
                error: false
            });
        } catch (error) {
            await prisma.$disconnect();

            const message = error instanceof Error ? error.message : String(error);
            return res.status(500).json({
                message: `An error occured: ${message}`,
                error: true
            });
        }
    }

    return res.status(400).json({
        message: 'Request method not supported!',
        error: true
    });
}
