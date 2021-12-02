import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({children}) => {
    const [searchInput, setSearchInput] = useState("")
    const [searchType, setSearchType] = useState("")
    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState(null)

    return <MainContext.Provider value={{searchInput, setSearchInput, loading,setLoading, searchType,setSearchType, user, setUser}}>{children}</MainContext.Provider>
}