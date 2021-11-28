import styles from "../styles/Product.module.css"
import Link from "next/link"
const Product = ({product})=>{
    return(
        <Link href={`/?searchType=SKU&searchInput=${product.materialID}`}>
            <a>
            <div className={styles.productContainer}>
                <img src={product.imageURL} alt={product.description}/>
                <h5>{product.description}</h5>
                <h5>{product.materialID}</h5>
            </div>
            </a>
        </Link>
    )
}

export default Product

