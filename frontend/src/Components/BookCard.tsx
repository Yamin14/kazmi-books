import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { Book } from "../types/book"
import { useBookNav } from "../types/openPages"

//props // book
interface Props {
    book: Book
}

//book card
const BookCard = ({book}: Props) => {

    //open page functions
    const { OpenEditBookPage, 
        OpenDeleteBookPage, OpenBookDetailsPage } = useBookNav();

    //return
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

        </div>
    )
}

export default BookCard