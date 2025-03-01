import React from "react"

interface Props {
    formData: {
        title: string,
        author: string,
        cover: File | null,
        genre: string,
        price: string,
        publishYear: string
    },
    imagePreview: string | null,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleGenreChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

//form
const BookForm = ({ formData, handleChange, handleSubmit,
    handleGenreChange, handleImageChange, imagePreview }: Props) => {

    //genres
    const genres = ["Fiction", "Self-Improvement", "Biography", "Islam", "Business", "History", "Novel"]

    //return
    return (
    <form onSubmit={handleSubmit} encType="multipart/form-data"
        className="form my-4 mx-auto py-8 pb-4 px-16
            border-2 rounded-2xl w-xl shadow-lg
            flex flex-col gap-4.5 justify-center items-center">
        
        {/* Title */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Book Cover:</label>
            <input 
                type="file"
                accept="image/*"
                name="cover"
                onChange={handleImageChange}
                className="w-64 py-1 px-2.5 border-2 rounded" />
            <div></div>
            {imagePreview &&
                <img src={imagePreview}
                    className="w-28 h-28 m-2.5" />}
        </div>

        {/* Title */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Title:</label>
            <input 
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter book title"
                onChange={handleChange}
                required
                className="w-64 py-1 px-2.5 border-2 rounded" />
        </div>
        
        {/* Author */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Author:</label>
            <input 
                type="text"
                name="author"
                value={formData.author}
                placeholder="Enter author's name"
                onChange={handleChange}
                required
                className="w-64 py-1 px-2.5 border-2 rounded" />
        </div>
        
        {/* Genre */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Genre:</label>
            <select name="genre"
                    value={formData.genre}
                    onChange={handleGenreChange}
                    required
                    className="w-64 py-1 px-2.5 border-2 rounded" >
                <option value="" selected disabled>Choose a genre</option>
                {genres.map(genre => (
                    <option value={genre} className="text-black">{genre}</option>
                ))}
            </select>
        </div>
        
        {/* Price */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Price:</label>
            <input 
                type="number"
                name="price"
                value={formData.price}
                placeholder="Enter price in Rs"
                onChange={handleChange}
                required
                className="w-64 py-1 px-2.5 border-2 rounded" />
        </div>
        
        {/* Publish Year */}
        <div className="w-full grid grid-cols-2">
            <label className="font-medium text-2xl">Publish Year:</label>
            <input 
                type="number"
                name="publishYear"
                value={formData.publishYear}
                placeholder="Enter publish year (e.g. 2024)"
                onChange={handleChange}
                required
                className="w-64 py-1 px-2.5 border-2 rounded" />
        </div>
        
        {/* Submit */}
        <div className="flex justify-center">
            <button type="submit"
                className="button">
                Save Book
            </button>
        </div>
    </form>
  )
}

export default BookForm