export enum OrderStatus {
    New = 'new',
    Confirmed = 'confirmed',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled'
}

export interface IOrder {
    id: number;
    orderDate: string;
    totalAmount: number;
    status: OrderStatus;
    user: {
        id: number;
        username: string;
        email: string;
        created: string;
        updated: string;
    };
    items: Array<{
        id: number;
        quantity: number;
        price: number;
        product: {
            id: number;
            name: string;
            article: string;
            price: number;
            oldPrice: number | null;
            isInStock: boolean;
            credit: string;
            slug: string;
            warranty: string;
            description: string | null;
            characteristics: string | null;
            imageUrl: string;
            quantity: number;
            views: number;
            created: string;
            updated: string;
        };
    }>;
}

export interface IOrderCreate {
    totalAmount: number;
    items: Array<{
        productId: number;
        quantity: number;
    }>;
}

export interface IOrderItem {
    productId: number;
    quantity: number;
  }

export interface ICreateOrderResponse {
    id: number;
    totalAmount: number;
    items: IOrderItem[];
  }