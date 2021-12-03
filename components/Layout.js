import React from 'react'
import styles from "../styles/Layout.module.css"
import HeaderNav from './HeaderNav'
import { ToastContainer } from "react-toastify";


export const Layout = ({children}) => {

    return (
        <div className={styles.mainLayout}>
            <nav className={styles.mainNav}>
               <HeaderNav/>
            </nav>
            {children}
            <ToastContainer/>
        </div>
    )
}
export default Layout