
import {  useAppSelector } from "../../../Store/hooks";
import { setHide } from "../../../Store/Allcategoryslice";
import  { useState } from "react";
import { useAppDispatch } from "../../../Store/hooks";

const SideAvailability = () => {
  const {products}=useAppSelector((state)=>state.products);
  const dispatch = useAppDispatch()
  const [stockvalue,setStockvalue]=useState<string>('');

  const numofstock = products.filter((item)=> item.quantity !=0)
  const numoutofstock = products.filter((item)=>item.quantity ==0);

  return (
    <div className="mt-6 md:mt-13">
      <h1 className="font-semibold text-[#202435] mb-3 text-sm sm:text-base">
        AVAILABILITY
      </h1>
      <div className="flex justify-between items-center text-[#71778E] mb-2">
        <div className="whitespace-nowrap flex items-center"  >
          <input
            type="radio"
            name="stock"
            id="instock"
            checked={stockvalue=== 'stock'}
            onChange={(e)=>{
             return setStockvalue(e.target.value),dispatch(setHide(true))}}
            className="w-4 h-4"
            value='stock'
           
          />
          <label htmlFor="instock" className="ml-3 text-sm sm:text-base">
            In stock
          </label>
        </div>
        <p className="text-sm sm:text-base">{numofstock.length}</p>
      </div>
      <div className="flex justify-between items-center text-[#71778E]">
        <div className="whitespace-nowrap flex items-center" >
          <input
            type="radio"
            name="stock"
            id="outstock"
            onChange={(e)=>{
             return setStockvalue(e.target.value) ,dispatch(setHide(false))}}
            checked={stockvalue==='outofstock'}
            value='outofstock'
            className="w-4 h-4"
          />
          <label htmlFor="outstock" className="ml-3 text-sm sm:text-base">
            Out of stock
          </label>
        </div>
        <p className="ml-2 text-sm sm:text-base">{numoutofstock.length}</p>
      </div>
    </div>
  );
};

export default SideAvailability;
