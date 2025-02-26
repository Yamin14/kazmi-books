
export interface Book {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
    genre: string;
    price: number;
    publishYear: number;
    createdAt?: string;
    updatedAt?: string
}