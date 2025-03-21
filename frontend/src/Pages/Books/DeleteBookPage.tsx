import { useNavigate, useParams } from "react-router"
import api from "../../api";
import Swal from 'sweetalert2';

const DeleteBookPage = () => {

  const { id } = useParams();
  const nav = useNavigate();

  //delete
  const handleDelete = () => {
    api.delete(`/books/${id}`)
      .then((res) => {
        if (res.data.success) {
          nav("/books");
          Swal.fire({
            title: "Deleted",
            text: "The book has been removed.",
            icon: "success"
          });
        }
      })
      .catch(err => console.log(err));
  }

  //return
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl md:text-5xl mb-4">Delete Book</h1>
      <p className="mb-4 text-center text-xl md:text-3xl">Are you sure you want to delete this book?</p>

      <div className="flex gap-2.5 justify-center text-xl">
        <button className="button button-delete"
          onClick={handleDelete}>
          Delete Book
        </button>
        <button className="button"
          onClick={() => nav("/books")}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBookPage