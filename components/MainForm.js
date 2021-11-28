import { useContext } from "react";
import { MainContext } from "../utils/MainContext";
import typeOfSearch from "../utils/typeOfSearch";
import { useRouter } from "next/router";
export default function MainForm() {
  const router = useRouter()
  const { searchInput, setSearchInput,setSearchType, setLoading } = useContext(MainContext);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchType(typeOfSearch(searchInput))
    setLoading(true)
    router.push(`indextest?searchType=${typeOfSearch(searchInput)}&searchInput=${searchInput}`)
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        // value={searchInput || router.query.searchInput }
        value={searchInput }
        onChange={(e) => setSearchInput(e.target.value)}
        required={true}
      />
    </form>
  );
}