import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "./SearchBar";
import { useBookNav } from "../types/openPages";

const Navbar = () => {

  //nav
  const { OpenHomePage, OpenSignupPage } = useBookNav();

  //return
  return (
    <div className="bg-gray-800 py-3 px-2.5 sticky top-0
        flex items-center justify-between">

      {/* Head */}
      <div className="flex items-center gap-1 hover:cursor-pointer"
          onClick={OpenHomePage}>
        <LazyLoadImage className="w-7 h-7 md:w-14 md:h-14 hover:animate-pulse duration-300"
          src="./logo.png" alt="Books Logo" placeholderSrc={"./logo.webp"} />
        <h1 className="text-lg md:text-3xl">Kazmi Books</h1>
      </div>

      <SearchBar />

      {/* responsive sign up button */}
      <button className="md:flex bg-blue-800 text-white text-sm md:text-xl font-medium
          px-3 py-1 md:px-4 md:py-2 rounded-lg
          hover:bg-blue-600 hover:cursor-pointer" onClick={OpenSignupPage}>
        Sign Up
      </button>

    </div>
  )
}

export default Navbar