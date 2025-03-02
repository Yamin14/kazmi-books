
import { useEffect, useMemo, useState } from "react";
import Loading from "../Components/Loading";
import api from "../api";
import { Book } from "../types/book";
import BookCard from "../Components/BookCard";
import { useBookNav } from "../types/openPages";
import GenreHeading from "../Components/GenreHeading";
import { useSearchStore } from "../store/searchStore";

const BooksPage = () => {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const { OpenAddBookPage } = useBookNav();

    //get books
    useEffect(() => {
        const getBooks = async () => {
            setLoading(false);
            await api.get("/books")
                .then((res) => {
                    setLoading(false);
                    setBooks(res.data.data); //books
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getBooks();
    }, [])

    //filter books based on search
    const { searchTerm } = useSearchStore();
    const booksToDisplay = useMemo(() => {
        return books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())
            || book.author.toLowerCase().includes(searchTerm.toLowerCase()))},
        [searchTerm, books]);

    //group books by genre
    const grouped = useMemo(() => {
        return booksToDisplay.reduce((acc, book) => {
            if (!acc[book.genre]) {
                acc[book.genre] = []; //create array for genre if not already exists
            }
            acc[book.genre].push(book); //add book to genre
            return acc;
        }, {} as Record<string, Book[]>);
    }, [booksToDisplay]);

    //loading
    if (loading)
        return <Loading />

    //return
    return (
        <div className="text-center">
            <h1 className="font-bold text-4xl m-4 bg-gray-800 p-4">
                List of Books
            </h1>

            {/* Add Button */}
            <button onClick={OpenAddBookPage}
                className="button !rounded-full fixed text-4xl bottom-1 right-1 md:bottom-3 md:right-3">
                +
            </button>

            {/* Grid */}
            {Object.entries(grouped).map(([genre, genreBooks]) => (
                <div className="my-5" key={genre}>
                    <GenreHeading heading={genre} />
                    <div
                        className="my-6 grid place-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {genreBooks.map((book) => {
                            return (
                                <BookCard book={book} key={book._id} />
                            );
                        })}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default BooksPage