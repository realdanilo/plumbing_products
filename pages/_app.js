import '../styles/globals.css'
import {MainContextProvider} from "../utils/MainContext"
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <MainContextProvider><Component {...pageProps} /> </MainContextProvider>
}

export default MyApp
