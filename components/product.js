import styles from "../styles/Home.module.css"
import Link from "next/link"
const Product = (product)=>{
    return(
        <Link href={`/?id=${product.materialID}`}>
            <a>
            <div className={styles.productContainer}>
                <img src={product.imageURL} alt={product.description}/>
                <h5>{product.description}</h5>
            </div>
            </a>
        </Link>
    )
}

export default Product

