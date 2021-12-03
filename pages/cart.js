import React, { useContext } from "react";
import Layout from "../components/Layout";
import { MainContext } from "../utils/MainContext";
import { Update, Delete } from "../utils/AddToCartHelpers";
import {  toast } from "react-toastify";
import MetaSearchEngine from "../components/MetaSearchEngine"

import Link from "next/link";

const Cart = () => {
  const { cart, setCart, user } = useContext(MainContext);
  const handleChange = (e) => {
    let SKU = e.target.getAttribute("data-sku");
    let updatedQty = Update({ SKU, quantity: parseInt(e.target.value) }, cart);
    setCart({ ...cart, products: updatedQty });
  };
  const handleDelete = (e) => {
    let SKU = e.target.getAttribute("data-sku");
    let updatedProducts = Delete({ SKU }, cart);
    setCart({ ...cart, products: updatedProducts });
    toast.warning("Deleted", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Layout>
        <MetaSearchEngine/>
      <h1>Checkout Page</h1>
      {cart.products.length == 0 && <p>Cart is empty</p>}
      <ul>
        {user &&
          cart.products.map((p) => (
            <li key={p.SKU}>
              <Link href={`/?searchType=SKU&searchInput=${p.SKU}`}>
                <p>{p.description}</p>
              </Link>
              <small>Qty: </small>
              <input
                type="number"
                min={1}
                value={p.quantity}
                data-sku={p.SKU}
                onChange={handleChange}
              />
              <small>Price: {p.price}</small>
              <small data-sku={p.SKU} onClick={handleDelete}>
                Delete
              </small>
            </li>
          ))}
      </ul>
      <h6>Total: {cart.total}</h6>
    </Layout>
  );
};

export default Cart;
