import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router"
import SearchBar from "./SearchBar";

const Navbar = () => {

  //nav to home page
  const nav = useNavigate();
  const OpenHomePage = () => {
    nav("/");
  }

  //return
  return (
    <div className="bg-gray-800 py-3 px-2.5 sticky top-0
        flex items-center gap-14">

      {/* Head */}
      <div className="flex items-center gap-1 hover:cursor-pointer"
          onClick={OpenHomePage}>
        <LazyLoadImage className="hover:animate-pulse duration-300"
          src="./logo.png" alt="Books Logo"
          width={50} height={50} placeholderSrc={"./logo.webp"} />
        <h1 className="text-3xl">Kazmi Books</h1>
      </div>

      <SearchBar />

    </div>
  )
}

export default Navbar