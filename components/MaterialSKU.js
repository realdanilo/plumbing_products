import React from "react";
import styles from "../styles/MaterialSKU.module.css";

const MaterialSKU = ({ product }) => {
  return (
    <div className={styles.content}>
      <div>
        <img src={product.imageURL} alt={product.description} />
      </div>
      <h2>{product.description}</h2>
      <h3>{product?.categoryName}</h3>
    </div>
  );
};

export default MaterialSKU;
