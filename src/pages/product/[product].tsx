import { fetcher } from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import Detail from "@/views/detailProduct";
import { productType } from "@/Types/product.type";

const DetailProduct=({product}:{product:productType})=>{
const router=useRouter();
// const {data,error,isLoading}=useSWR(`/api/products/${router.query.product}`,fetcher);
    return(
        <div>
            {/* <Detail product={isLoading?[] : data.data} /> */}
            <Detail product={product}/>
        </div>
    )
}
 export default DetailProduct;
// export async function getServerSideProps({params}){
//     const res=await fetch(`http://localhost:3000/api/products/${params.product}`);
//     const response= await res.json();
//     return {
//         props:{
//             product:response.data,
//         }
//     }
    
// }
export async function getStaticPaths() {
    const res=await fetch(`http://localhost:3000/api/products`);
    const products=await res.json();
    const paths=products.data.map((product:productType)=>({
        params:{
            product:product.id,
        }
    })) 
    return {paths,fallback:false}
}
export async function getStaticProps({params,}:{params:any}){
    const res=await fetch(`http://localhost:3000/api/products/${params.product}`);
    const products= await res.json();
    return {
        props:{
            product:products.data,
        },
    };
}
