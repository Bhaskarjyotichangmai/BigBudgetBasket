'use client'
import { FC } from "react";

interface pageProps{
   params:{items:string}
}
const page: FC<pageProps>=({params})=>{
    console.log(params)
    return <div>
        <h1 className="text-9xl">items are:{params.items} </h1>
    </div>
}  
export default page;