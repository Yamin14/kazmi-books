export interface User {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "customer" | "seller";
    isApproved?: boolean;
    storeName?: string;
    storeLocation?: string;
    createdAt?: string;
    updatedAt?: string
}