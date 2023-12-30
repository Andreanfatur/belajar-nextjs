import { productType } from "@/Types/product.type";
import styles from "./detail.module.scss";
const Detail=({product}:{product:productType})=>{
    return(
            <div className={styles.productDetail}>
                <h2>Detail Product</h2>
                <div className={styles.productDetail__image}><img src={product.image && product.image} alt={product.name} /></div>
                <h4 className={styles.productDetail_name}>{product.name}</h4>
                <p className={styles.productDetail__category}>{product.category}</p>
                <p className={styles.productDetail__price}>{product.price && product.price.toLocaleString("id-ID",{style:"currency",currency:"IDR",})}</p>
            </div>
        )  
}
export default Detail;