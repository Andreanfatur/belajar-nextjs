import ProductView from "@/views/products/main";
import { productType } from "../../Types/product.type";


const ProductPage=(props:{products:productType})=>{
    const {products}=props;
        return(
            <ProductView products={products}/>
        )
}
export default ProductPage;

export async function getServerSideProps(){
    const res=await fetch("http://localhost:3000/api/products");
    const response= await res.json();
    return {
        props:{
            products:response.data,
        }
    }
    
}