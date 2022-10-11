export type Product = {
    id: string;
    name: string;
    price: number;
    deal: string;
};

export type ProductWithAmount = {
    product: Product;
    amount: number;
};