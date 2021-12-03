import React, { useState, useContext } from "react";
import { MainContext } from "../utils/MainContext";
import { Add, Update } from "../utils/AddToCartHelpers";

const AddToCart = ({ product }) => {
  const { cart, setCart } = useContext(MainContext);
  //check if that product was already selected, then set that qty
  let foundProduct = cart.products.find((x) => x.SKU == product.materialID);
  let startingQty = foundProduct?.quantity;
  //{SKU:product.materialID, description:product.description, quantity}
  const [quantity, setQuantity] = useState(startingQty || 1);
  let newCartProducts = [];
  if (cart.products.length == 0 || !foundProduct) {
    newCartProducts = [
      ...cart.products,
      { SKU: product.materialID, description: product.description, quantity },
    ];
  } else {
    newCartProducts = [
      ...cart.products.map((p) =>
        p.SKU == product.materialID ? { ...p, quantity } : p
      ),
    ];
  }
  const handleAddToCart = (e) => {
    e.preventDefault();
    setCart({
      ...cart,
      products: newCartProducts
    })}
  return (
    <div>
      <label>Qty: </label>
      <input
        type="number"
        min={0}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      {quantity >= 1 && <button onClick={handleAddToCart}>Add</button>}
    </div>
  );
};

export default AddToCart;
