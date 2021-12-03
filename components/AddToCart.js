import React, { useState, useContext } from "react";
import { MainContext } from "../utils/MainContext";
import { Add, Update } from "../utils/AddToCartHelpers";

const AddToCart = ({ product }) => {
  const { cart, setCart } = useContext(MainContext);
  //if product was already selected, then set that qty
  let foundProduct = cart.products.find((x) => x.SKU == product.materialID);
  let startingQty = foundProduct?.quantity;
  const [quantity, setQuantity] = useState(startingQty || 1);
  let newCartProducts = [];
  //add or update on cart
  if (cart.products.length == 0 || !foundProduct) {
    newCartProducts = Add(product = { SKU: product.materialID, description: product.description, quantity, price:17 },cart)
  } else {
    newCartProducts = Update(product = {SKU:foundProduct.SKU, quantity },cart)
  }
  const handleAddToCart = (e) => {
    e.preventDefault();
    setCart({
      ...cart,
      products: newCartProducts
    })}
  return (
    <form onSubmit={handleAddToCart}>
      <label>Qty: </label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
       <button onClick={handleAddToCart}>{foundProduct?.quantity != quantity ? "Update" : foundProduct?.quantity == quantity ? "Updated!" : "Add"}</button>
    </form>
  );
};

export default AddToCart;
