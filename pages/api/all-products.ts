import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Product } from '../../@types/product';

const prisma = new PrismaClient();

type Response = {
    message: string;
    error: boolean;
    data: Product[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'GET') {
        try {
            await prisma.$connect();

            const products = await prisma.product.findMany();

            if (!products || products.length === 0) {
                throw new Error('There are currently no products that we offer.');
            }

            await prisma.$disconnect();
            return res.status(200).json({
                message: 'Successfully fetched all products from the database!',
                error: false,
                data: products
            });
        } catch (error) {
            await prisma.$disconnect();

            const message = error instanceof Error ? error.message : String(error);
            return res.status(500).json({
                message: `An error occured: ${message}`,
                error: true,
                data: []
            });
        }
    }

    return res.status(400).json({
        message: 'Request method not supported!',
        error: true,
        data: []
    });
}
