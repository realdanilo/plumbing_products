import styles from "../styles/MaterialDescription.module.css"
import Product from "../components/product"

const MaterialDescription = ({products}) => {
    return (
        <div className={styles.productsContainer}>
            {products.map(p => <Product product={p} key={p.materialID}/>)}
        </div>
    )
}

export default MaterialDescription
