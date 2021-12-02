import { useContext } from "react";
import { MainContext } from "../utils/MainContext";
import typeOfSearch from "../utils/typeOfSearch";
import { useRouter } from "next/router";
import styles from "../styles/MainForm.module.css"

export default function MainForm() {
  const router = useRouter()
  const { searchInput, setSearchInput,setSearchType, setLoading } = useContext(MainContext);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchType(typeOfSearch(searchInput))
    setLoading(true)
    router.push(`/?searchType=${typeOfSearch(searchInput)}&searchInput=${searchInput}`)
  };
  return (
    <div className={styles.container}>
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        // value={searchInput || router.query.searchInput }
        value={searchInput }
        onChange={(e) => setSearchInput(e.target.value)}
        required={true}
        autoFocus={true}
        placeholder="Search by SKU or Description"
      />
    </form>
    </div>
  );
}
