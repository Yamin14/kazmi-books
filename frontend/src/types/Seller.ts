import { Book } from "./book";
import { User } from "./User";

export interface Seller extends User {
    storeName: string,
    storeLocation: string,
    books: Book[]
}
