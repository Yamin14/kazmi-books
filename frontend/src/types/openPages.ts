import { useNavigate } from "react-router";

export const useBookNav = () => {
    const nav = useNavigate();

    //home page
    const OpenHomePage = () => {
        nav('/');
    }

    //books list page
    const OpenBooksPage = () => {
        nav('/books');
    }

    //add book page
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

    //details page
    const OpenSignupPage = () => {
        nav(`/auth/signup`);
    }

    //details page
    const OpenLoginPage = () => {
        nav(`/auth/login`);
    }

    return {
        OpenHomePage, OpenAddBookPage, OpenEditBookPage, OpenDeleteBookPage,
        OpenBooksPage, OpenBookDetailsPage, OpenSignupPage, OpenLoginPage
    };

}
