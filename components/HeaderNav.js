import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../utils/MainContext";
import styles from "../styles/HeaderNav.module.css"

const HeaderNav = () => {
  const { user, setUser, cart:{products}} = useContext(MainContext);
  const handleLogOut = (e) => {
    setUser(null);
  };
  return (
    <div className={styles.headerNav}>
      {user ? (
        <>
          <Link href="/"><a>Home</a></Link>
          <Link href="/cart"><a>Cart ({products.length})</a></Link>
          <p style={{ margin: 0 }} onClick={handleLogOut}>
            Log Out
          </p>

        </>
      ) : (
        <>
          <Link href="/"><a>Home</a></Link>
          <Link href="/register"><a>Register</a></Link>
          <Link href="/login"><a>Log In</a></Link>
        </>
      )}
    </div>
  );
};

export default HeaderNav;
