import React, { useEffect, useState } from "react";
import arrowright from "../images/arrowright.png";
import { useAppDispatch ,useAppSelector } from "../../Store/hooks";
import { getproducts } from "../../Store/getProuductsReducer";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import ProductRating from "../ProductRating/ProductRating";



export default function BestSellers() {
  const [view, setView] = useState(false);
  const {products,isloading}=useAppSelector((state)=>state.products);
  const dispatch =useAppDispatch();

  useEffect(()=>{
    dispatch(getproducts(1))

  },[dispatch])


const Allproducts = Array.isArray(products)? view  ? products  : products.slice(0, 10)
    : [];

  return (
    <div className="BestSellers w-[80%] mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="mr-5">
          <p className="font-bold text-xl">Best Sellers</p>
          <p className="text-[#9B9BB4]">
            Do not miss the current offers until the end of month.
          </p>
        </div>
        <div className=" text-[var(#9B9BB4)] w-[112.3px] h-[34px] flex justify-between items-center border-1 border-gray-400 rounded-full p-2  hover:bg-green-900 hover:text-amber-50">
          <button
            onClick={() => setView(!view)}
            className="cursor-pointer max-sm:text-[12px] font-bold"
          >
            {view ? "hide" : "view All"}
          </button>
          <img
            src={arrowright}
            alt="arrow-right"
            className="w-[15px] h-[15px] "
          ></img>
        </div>
      </div>

      <div>
            {
              isloading ? <Loader/> :
               <div className="grid lg:grid-cols-5  max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
                  {
                  products &&
                  Allproducts.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                  <div className={` flex flex-col items-center gap-2 border-1 border-[#EDEEF5] p-3 relative`}>

                      <div
                        className="w-[45.22px] bg-[#35AFA0] flex
                             justify-center items-center rounded p-1
                             absolute left-5
                             "
                      >
                        <p className="text-[#FFFFFF] text-[12px] font-bold">
                          22%
                        </p>
                      </div>
                      <Link to={`/productDetails/${item.id}`}>
                      <img src={item.images[0]} alt="product-image"></img>
                      </Link>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="font-bold text-[#00B853]">In stock</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <ProductRating averageRating={item.ratingsAverage}/>
                        </div>
                        <div>
                          <p>{item.ratingsQuantity} review</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p className="text-[#C2C2D3] font-bold">$9.35</p>
                        <p className="text-[#D51243] font-bold text-lg">
                          $7.25
                        </p>
                      </div>
                    
                  </div>
                  </React.Fragment>
                      );
                    })}
                 </div>

            }
           
      
       
      </div>
    </div>
  );
}
