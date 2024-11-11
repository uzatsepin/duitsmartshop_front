export interface IReview {
    id: number;
    rating: number;
    text: string;
    created: Date;
    likes: number;
    user: {
        created: string;
        email: string;
        id: number;
        updated: Date;
        username: string;
    }
}

interface ReviewProduct {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
}

export interface IReviewUser {
    id: number;
    rating: number;
    text: string;
    likes: number;
    created: string; 
    product: ReviewProduct;
}