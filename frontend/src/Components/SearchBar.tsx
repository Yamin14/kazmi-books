import { useSearchStore } from "../store/searchStore"

const SearchBar = () => {

  //search term
  const { searchTerm, setSearchTerm } = useSearchStore();

  //return
  return (
      <input 
        type="text" 
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by book title or author" />
  )
}

export default SearchBar