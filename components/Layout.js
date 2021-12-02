import React from 'react'
import styles from "../styles/Layout.module.css"
import HeaderNav from './HeaderNav'


export const Layout = ({children}) => {

    return (
        <div className={styles.mainLayout}>
            <nav className={styles.mainNav}>
               <HeaderNav/>
            </nav>
            {children}
        </div>
    )
}
export default Layout