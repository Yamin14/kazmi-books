
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import api from "../api";
import { Book } from "../types/book";
import { useNavigate } from "react-router";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const BooksPage = () => {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    //get books
    useEffect(() => {
        setLoading(false);
        api.get("/books")
            .then((res) => {
                setLoading(false);
                setBooks(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    //add new book page
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

    //loading
    if (loading)
        return <Loading />

    //return
    return (
        <div className="text-center font-sans">
            <h1 className="font-bold text-4xl m-4 bg-gray-800 p-4">Browse Books</h1>

            {/* Add Button */}
            <button onClick={OpenAddBookPage}
                className="button">
                Add New Book
            </button>

            {/* Grid */}
            <div
                className="my-6 grid place-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => {
                    return (
                        <div key={book._id}
                            className="w-2xs p-4
                                rounded-lg shadow-lg bg-gray-900
                                border-2 border-gray-700
                                hover:border-black hover:shadow-xl transition-300">

                            {/* Cover Image */}
                            <img src={book.coverImage
                                ? `http://localhost:3000/${book.coverImage}`
                                : '/no_cover.jpg'} 
                                className="h-40 w-40 mx-auto" />

                            {/* Book Details */}
                            <h1 className="text-lg font-semibold m-2 truncate hover:underline hover:text-blue-500 hover:cursor-pointer"
                                onClick={() => OpenBookDetailsPage(book._id)}>
                                {book.title}</h1>
                            <p className="text-md text-gray-300 truncate">Author: {book.author}</p>
                            <p className="text-md text-gray-300">Price: Rs. {book.price}</p>

                            {/* Buttons */}
                            <div className="m-2.5 mt-4 flex justify-evenly items-center">
                                <button
                                    className="hover:cursor-pointer hover:text-blue-500"
                                    onClick={() => OpenBookDetailsPage(book._id)}>
                                    <BsInfoCircle />
                                </button><br />
                                <button
                                    className="hover:cursor-pointer hover:text-green-500"
                                    onClick={() => OpenEditBookPage(book._id)}>
                                    <AiOutlineEdit />
                                </button><br />
                                <button
                                    className="hover:cursor-pointer hover:text-red-500"
                                    onClick={() => OpenDeleteBookPage(book._id)}>
                                    <AiOutlineDelete />
                                </button>
                            </div>

                        </div>);
                })}
            </div>

        </div>
    )
}

export default BooksPage