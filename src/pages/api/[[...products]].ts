// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retriveData, retriveDataById } from '@/utils/db/service';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status:boolean;
    statusCode:number;
    data:any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.query.products![1]){
    const data=await retriveDataById('products',req.query.products![1]);
    res.status(200).json({status:true,statusCode:200,data});
  }else{
    const data=await retriveData("products");
    res.status(200).json({status:true,statusCode:200,data});
  }
}
