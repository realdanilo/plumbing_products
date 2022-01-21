import React, { useState, useContext } from "react";
import { MainContext } from "../utils/MainContext";
import { Add, Update } from "../utils/AddToCartHelpers";
import { toast } from "react-toastify";
import styles from "../styles/AddToCart.module.css";

const AddToCart = ({ product }) => {
  const { cart, setCart } = useContext(MainContext);
  //if product was already selected, then set that qty
  let foundProduct = cart.products.find((x) => x.SKU == product.materialID);
  let startingQty = foundProduct?.quantity;
  const [quantity, setQuantity] = useState(startingQty || 1);
  let newCartProducts = [];
  //add or update on cart
  if (cart.products.length == 0 || !foundProduct) {
    newCartProducts = Add(
      (product = {
        SKU: product.materialID,
        description: product.description,
        quantity,
        price: 17,
      }),
      cart
    );
  } else {
    newCartProducts = Update(
      (product = { SKU: foundProduct.SKU, quantity }),
      cart
    );
  }
  const handleAddToCart = (e) => {
    e.preventDefault();
    setCart({
      ...cart,
      products: newCartProducts,
    });
    toast.success("Success", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className={styles.mainAddToCart}>
      <form onSubmit={handleAddToCart}>
        <label htmlFor="quantity">Qty: </label>
        <input
          name="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        />
        <button onClick={handleAddToCart}>
          {foundProduct == undefined
            ? "Add"
            : foundProduct?.quantity != quantity
            ? "Update"
            : "Updated"}
        </button>
      </form>
    </div>
  );
};

export default AddToCart;
