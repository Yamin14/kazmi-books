import { useNavigate } from "react-router"
import { LazyLoadImage } from 'react-lazy-load-image-component'

const HomePage = () => {

  //navigate
  const nav = useNavigate();

  const OpenBooksPage = () => {
    nav('/books');
  }

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen text-white">
      
      <LazyLoadImage className="w-20 h-20 md:w-36 md:h-36 hover:animate-pulse duration-300"
        src="./logo.png" alt="Books Logo" placeholderSrc={"./logo.webp"} />

      <h1 className="m-2 md:m-5 text-center text-3xl md:text-7xl hover:text-yellow-300 transition duration-300">
        Welcome to Kazmi Books</h1>
      <h2 className="mb-5 text-center text-md md:text-2xl hover:text-yellow-300 transition duration-300">
        Explore a world of stories, knowledge, and imagination!</h2>

      <button onClick={OpenBooksPage}
        className="button">
          Browse Books
      </button>

    </div>
  )
}

export default HomePage