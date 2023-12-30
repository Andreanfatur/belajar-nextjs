import { url } from "inspector";
import { type } from "os";
import styles from "./product.module.scss";
import { productType } from "@/Types/product.type";
import Link from "next/link";

const ProductView=({products}:{products:productType})=>{

    return(
        <div className={styles.product}>
            <h1 className={styles.product__title}>Product</h1>
                <div className={styles.product__content}>
                    {products.length>0 ?(
                        <div>
                        {products.map((product:productType)=>(
                    <Link href={`product/${product.id}`} key={product.id}   >
                        <div key={product.id}>
                            <div className={styles.product__content__item}>
                            <div className={styles.product__content__item__image}><img src={product.image} alt={product.name} /></div>
                            <h4 className={styles.product__content__item_name}>{product.name}</h4>
                            <p className={styles.product__content__item__category}>{product.category}</p>
                            <p className={styles.product__content__item__price}>{product.price.toLocaleString("id-ID",{style:"currency",currency:"IDR",})}</p>
                            </div>
                        </div>
                    </Link>                       
                        
                    ))}
                        </div>
                    ):(   
                    <div className={styles.product__content__sceleton}>
                        <div className={styles.product__content__skeleton__image} />
                        <div className={styles.product__content__skeleton__name} />
                        <div className={styles.product__content__skeleton__category} />
                        <div className={styles.product__content__skeleton__price} />
                    </div>
                    )}
                   
                </div>
        </div>
    )
}
export default ProductView;