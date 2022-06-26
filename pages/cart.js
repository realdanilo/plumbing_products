import React, { useContext, useState, useEffect} from "react";
import Layout from "../components/Layout";
import { MainContext } from "../utils/MainContext";
import { Update, Delete, CalculateTotal } from "../utils/AddToCartHelpers";
import { toast } from "react-toastify";
import MetaSearchEngine from "../components/MetaSearchEngine";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'

const Cart = () => {
  const router = useRouter()
  const [payModal, setPayModal] = useState(false)
  const [payButton, setPayButton] = useState(false)
  const { cart, setCart, user } = useContext(MainContext);
  const handleChange = (e) => {
    if (parseInt(e.target.value) == NaN || e.target.value == "" ) e.target.value =0
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
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submitPayment = () => {
    toast.success("Submitted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect( () => {
    if(payButton){
      console.log("pay")
      setCart({...cart,products:[]})
      submitPayment()
      return setTimeout(() => {
        router.push("/")
      }, 5500);
    }
  },[payButton])
  return (
    <Layout>
      <MetaSearchEngine title="Cart" />
      <div className={styles.cartCheckout}>
        <h1>Checkout Page</h1>
        {cart.products.length == 0 && <p className={styles.empty}>Cart is empty</p>}
        <ol>
          {user &&
            cart.products.map((p) => (
              <li key={p.SKU}>
                <Link href={`/?searchType=SKU&searchInput=${p.SKU}`}>
                  <p className={styles.skuLink}>{p.description}</p>
                </Link>
                <small>Qty: </small>
                <input
                  type="number"
                  min={0}
                  value={p.quantity}
                  data-sku={p.SKU}
                  onChange={handleChange}
                  required={true}
                />
                <small>Price: {p.price}</small>
                <small data-sku={p.SKU} onClick={handleDelete}>
                  Delete
                </small>
              </li>
            ))}
        </ol>
        {user && cart.products.length > 0 && (
          <div className={styles.totalCalc}>
            <hr className={styles.hr}/>
            <h6>$ Total: {cart.total.toLocaleString()}</h6>
            <h6>Taxes: 8.3%</h6>
            <h6>
              $ Final: {Math.round((cart.total * 1.083 * 10) / 10).toLocaleString()}
            </h6>
            <button className={styles.payBtn} onClick={()=> setPayModal(true)}>Pay</button>
          </div>
        )}
        {payModal && (
          <div className={styles.payModal}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" inputMode="text" value="Dan Mr Wonderful" disabled={true}/>
            <label htmlFor="email">Emai:</label>
            <input id="email" type="email" value={user.email} disabled={true}/>
            <label htmlFor="street">Street:</label>
            <input id="street" type="text" inputMode="text" value="Phoenix Downtown" disabled={true}/>
            <label htmlFor="ccn">Credit Card Number:</label>
            <input id="ccn" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" 
            autoComplete="cc-number" value="1111 2222 3333 4444"
            maxLength="16" placeholder="1xxx x1xx xx1x xxx1" disabled={true}/>
            <button onClick={()=> setPayModal(false)}>Go Back</button>
            <button onClick={()=> setPayButton(true)}>Submit Payment</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
