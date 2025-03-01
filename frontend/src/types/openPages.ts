import { useNavigate } from "react-router";

export const useBookNav = () => {
    const nav = useNavigate();

    const OpenAddBookPage = () => {
        nav('/books/add');
    }

    //edit page
    const OpenEditBookPage = (id: string) => {
        nav(`/books/edit/${id}`);
    }

    //delete page
    const OpenDeleteBookPage = (id: string) => {
        nav(`/books/delete/${id}`);
    }

    //details page
    const OpenBookDetailsPage = (id: string) => {
        nav(`/books/${id}`);
    }

    return { OpenAddBookPage, OpenEditBookPage, OpenDeleteBookPage, OpenBookDetailsPage };

}
