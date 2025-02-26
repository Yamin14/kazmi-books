import { useParams } from "react-router"
import api from "../api";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import BackButton from "../Components/BackButton";

const BookDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState({
    _id: "",
    title: "",
    author: "",
    coverImage: null,
    genre: "",
    price: "",
    publishYear: ""
  });
  const [loading, setLoading] = useState(true);

  //get book
  useEffect(() => {
    setLoading(false);
    api.get(`/books/${id}`)
    .then((res) => {
      setBook(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err));
  }, []);

  //return
  if (loading)
    return <Loading />

  return (
    <>
    <BackButton />
    <div className="flex flex-col justify-center items-center min-h-screen font-sans text-2xl">
      <div className="border border-gray-700 text-center py-10 px-14 rounded-lg
        bg-gradient-to-b from-gray-600 to-gray-550">

        {/* Cover Image */}
        <img src={book.coverImage
                ? `http://localhost:3000/${book.coverImage}`
                : '/no_cover.jpg'} 
              className="h-50 w-50 mx-auto" />

        {/* Book Details */}
        <p className="m-4 opacity-50 italic">{book._id}</p>
        <p className="mb-4">{book.title}</p>
        <p className="mb-4">Author: {book.author}</p>
        <p className="mb-4">Genre: {book.genre}</p>
        <p className="mb-4">Price: Rs. {book.price}</p>
        <p className="">Publish Year: {book.publishYear}</p>

      </div>
    </div>
    </>
  )
}

export default BookDetails