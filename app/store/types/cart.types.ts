import type { IProduct } from "./product.types";

export interface ICart {
    cartItems: ICartItem[]
    totalItems: number;
    totalSum: number;
}

export interface ICartItem {
    id: number;
    product: IProduct;
    quantity: number;
}