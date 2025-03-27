import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "./SearchBar";
import { useBookNav } from "../../types/openPages";
import SignUpButton from "../Auth/SignUpButton";
import { useState } from "react";
import Sidebar from "../SideBar/Sidebar";

const Navbar = () => {

  //nav
  const { OpenHomePage } = useBookNav();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //return
  return (
    <>
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

        <div className="flex items-center">
          <SignUpButton />

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:text-gray-300 focus:outline-none ml-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

export default Navbar