import { useRouter } from "next/router";
const ShoopPage=()=>{
const {query}=useRouter();
    return(
        <div>
            <h2>Detail Product</h2>
            <p>product :{`${query.products && query.products[0]+ "-" + query.products[1]}`}</p>
        </div>
    )
}
export default ShoopPage;