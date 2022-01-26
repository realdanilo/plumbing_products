import { createContext, useState , useEffect} from "react";
import {CalculateTotal} from "./AddToCartHelpers"

const initialProducts = [
        {
            "SKU": "10000557",
            "description": "H 1/2 FTGxC 45",
            "quantity": 100,
            "price": 17
        },
        {
            "SKU": "10002036",
            "description": "NPE 240S 199K TANKLESS HEATER",
            "quantity": 3,
            "price": 17
        },
        {
            "SKU": "10002024",
            "description": "30 SIDE-OUTLET WH PAN",
            "quantity": 2,
            "price": 17
        },
        {
            "SKU": "10008003",
            "description": "BM ABRASIVE CLOTH 2\"X5YRD",
            "quantity": 5,
            "price": 17
        }
]

export const MainContext = createContext();

export const MainContextProvider = ({children}) => {
    const [searchInput, setSearchInput] = useState("")
    const [searchType, setSearchType] = useState("")
    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState({ID:null, email:"test@gmail.com"})
    const [cart, setCart] = useState({total:0, products:[...initialProducts]})

    useEffect(()=>{
        let total = CalculateTotal(cart.products)
        setCart({...cart,total})
    }, [cart.products])

    return <MainContext.Provider value={{searchInput, setSearchInput, loading,setLoading, searchType,setSearchType, user, setUser, cart, setCart}}>{children}</MainContext.Provider>
}