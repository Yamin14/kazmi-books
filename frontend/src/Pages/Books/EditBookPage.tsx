import { useNavigate, useParams } from "react-router"
import BookForm from "../../Components/BookForm";
import { useEffect, useState } from "react";
import { FormData } from "../../types/FormData";
import api from "../../api";
import BackButton from "../../Components/BackButton";
import Swal from "sweetalert2";

const EditBookPage = () => {

  const { id } = useParams();
  const nav = useNavigate();
  
  //form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    cover: null,
    genre: "",
    price: "",
    publishYear: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //get book
  useEffect(() => {
    api.get(`/books/${id}`)
      .then((res) => {
        const book = res.data;
        setFormData({
          title: book.title,
          author: book.author,
          cover: book.coverImage,
          genre: book.genre,
          price: String(book.price),
          publishYear: String(book.publishYear)
        });

        //cover image
        if (book.coverImage)
          setImagePreview(`http://localhost:3000/${book.coverImage}`);
        else
          setImagePreview('/no_cover.jpg');
      })
      .catch(err => console.log(err));
  }, []);

  //handle value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  //handle gerne change
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, genre: e.target.value });
  }

  //handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file){
      setFormData({...formData, cover: file});
      setImagePreview(URL.createObjectURL(file));
    }
  }

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //update
    const formDataToSend = {
      title: formData.title,
      author: formData.author,
      cover: formData.cover,
      genre: formData.genre,
      price: Number(formData.price),
      publishYear: Number(formData.publishYear)
    }

    api.put(`/books/${id}`, formDataToSend, {headers: {"Content-Type": "multipart/form-data"}})
      .then(() => {
        nav("/books");
        Swal.fire({
          title: "Changes Saved!",
          text: "The book has been successfully updated!",
          icon: "success"
        });
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="font-bold text-3xl md:text-5xl text-center m-4">Edit Book</h1>
      <BookForm formData={formData} handleImageChange={handleImageChange} imagePreview={imagePreview}
      handleChange={handleChange}  handleGenreChange={handleGenreChange} handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditBookPage