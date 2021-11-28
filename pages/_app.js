import '../styles/globals.css'
import {MainContextProvider} from "../utils/MainContext"

function MyApp({ Component, pageProps }) {
  return <MainContextProvider><Component {...pageProps} /> </MainContextProvider>
}

export default MyApp
