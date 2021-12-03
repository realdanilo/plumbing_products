import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../utils/MainContext";

const HeaderNav = () => {
  const { user, setUser } = useContext(MainContext);
  const handleLogOut = (e) => {
    setUser(null);
  };
  return (
    <>
      {user ? (
        <>
          <p style={{ margin: 0 }} onClick={handleLogOut}>
            Log Out
          </p>
          <Link href="/cart">Cart</Link>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Log In</Link>
        </>
      )}
    </>
  );
};

export default HeaderNav;
