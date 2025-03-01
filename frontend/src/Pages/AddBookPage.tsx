import { useState } from "react";
import BookForm from "../Components/BookForm"
import api from "../api";
import { FormData } from "../types/FormData";
import { useNavigate } from "react-router";
import BackButton from "../Components/BackButton";
import Swal from "sweetalert2";

const AddBookPage = () => {

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

    //post
    const formDataToSend = {
      title: formData.title,
      author: formData.author,
      cover: formData.cover,
      genre: formData.genre,
      price: Number(formData.price),
      publishYear: Number(formData.publishYear)
    }

    api.post("/books", formDataToSend, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(() => {
        nav("/books");
        Swal.fire({
          title: "Book Saved!",
          text: "The book has been successfully added!",
          icon: "success"
        });
      })
      .catch(err => console.log(err));
  }

  //return
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="font-bold text-5xl text-center m-4">Add New Book</h1>
      <BookForm formData={formData} 
        handleChange={handleChange} handleSubmit={handleSubmit} handleGenreChange={handleGenreChange}
        handleImageChange={handleImageChange} imagePreview={imagePreview} />
    </div>
  )
}

export default AddBookPage