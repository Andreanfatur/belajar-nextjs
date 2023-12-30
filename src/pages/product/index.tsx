import ProductView from "@/views/products/main";
import { useRouter } from "next/router";
import { type } from "os";
import { use, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr/fetcher";

const ProductPage = () => {
  const { push } = useRouter();
  const [isLogin, setisLogin] = useState(false);
  // useEffect(() => {
  //     if(!isLogin){
  //         push("auth/login");
  //     }
  // }, []);
  // useEffect(()=>{
  //     fetch("api/products").then((res)=>res.json()).then((data)=>{
  //         setproducts(data.data);
  //     })
  // },[])

  const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

  return <ProductView products={isLoading ? [] : data?.data} />;
};
export default ProductPage;
