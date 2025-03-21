import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import api from "../../api";
import { Book } from "../../types/book";
import BookCard from "../../Components/Books/BookCard";
import { useBookNav } from "../../types/openPages";
import { useSearchStore } from "../../store/searchStore";
import GenreHeading from "../../Components/Books/GenreHeading";

const BooksPage = () => {

    //get books
    const { OpenAddBookPage } = useBookNav();
    const { data, isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await api.get("/books");
            return res.data;
        }
    })

    //filter books based on search
    const books: Book[] = data?.data || [];
    const { searchTerm } = useSearchStore();
    const booksToDisplay = useMemo(() => {
        return books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())
            || book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    },
        [books, searchTerm]);

    //group by genre
    const groupedBooks = useMemo(() => {
        return booksToDisplay.reduce((acc, book) => {
            if (!acc[book.genre]) {
                acc[book.genre] = [] //create genre if not exist
            }
            acc[book.genre].push(book) //add book to genre
            return acc;
        }, {} as Record<string, Book[]>)
    }, [booksToDisplay])

    //loading
    if (isLoading)
        return <Loading />

    //error
    if (error) return <div>Error: {error.message}</div>

    //return
    return (
        <div className="text-center">
            <h1 className="font-bold text-2xl md:text-4xl m-4 bg-gray-800 p-2 md:p-4">
                List of Books
            </h1>

            {/* Add Button */}
            <button onClick={OpenAddBookPage}
                className="button button-add fixed bottom-3 right-3">
                +
            </button>

            {/* Grid */}
            {Object.entries(groupedBooks).map(([genre, genreBooks]) => (
                <div key={genre}>
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
