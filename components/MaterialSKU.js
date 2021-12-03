import React, { useCallback, useContext } from "react";
import styles from "../styles/MaterialSKU.module.css";
import MetaSearchEngine from "./MetaSearchEngine";
import AddToCart from "./AddToCart";
import { MainContext } from "../utils/MainContext";

const MaterialSKU = ({ product }) => {
  const { user } = useContext(MainContext);

  return (
    <>
      <MetaSearchEngine title={product.description} />
      <div className={styles.content}>
        <div>
          <img src={product.imageURL} alt={product.description} />
        </div>
        <h2>{product.description}</h2>
        <h3>{product?.categoryName}</h3>
        {user ? <AddToCart product={product} /> : <p>Log in to add to cart</p>}
      </div>
    </>
  );
};

export default MaterialSKU;
