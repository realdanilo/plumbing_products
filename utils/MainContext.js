import { createContext, useState , useEffect} from "react";
import {CalculateTotal} from "./AddToCartHelpers"

export const MainContext = createContext();

export const MainContextProvider = ({children}) => {
    const [searchInput, setSearchInput] = useState("")
    const [searchType, setSearchType] = useState("")
    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState({total:0, products:[]})

    useEffect(()=>{
        let total = CalculateTotal(cart.products)
        setCart({...cart,total})
    }, [cart.products])

    return <MainContext.Provider value={{searchInput, setSearchInput, loading,setLoading, searchType,setSearchType, user, setUser, cart, setCart}}>{children}</MainContext.Provider>
}