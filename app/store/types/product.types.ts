import type { IReview } from "./reviews.types";

export interface IProduct {
    id: number;
    name: string;
    article?: string;
    price: number;
    oldPrice?: number;
    isInStock?: boolean;
    credit?: string;
    slug: string;
    warranty: string;
    description: string;
    characteristics?: string;
    imageUrl: string;
    quantity: number;
    views: number;
    category: {
      id: number;
      name: string;
      slug: string;
      icon: string;
    }
    brand: {
      id: number;
      name: string;
      slug: string;
    },
    reviews: IReview[];
  }