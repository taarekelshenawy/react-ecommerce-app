
import { Link } from "react-router-dom";
import ProductRating from "../../ProductRating/ProductRating";

type valueProps={
    id:string,
    images:string[],
    ratingsAverage:number,
    price:number,
    title:string,
}
export default function Products({id,images,ratingsAverage,price,title}:valueProps) {
  return (
     <div  className="border border-[#EDEEF5]
      w-full max-w-[213px] flex flex-col justify-center 
      items-start gap-1.5 rounded-[8px] py-6 px-5"
        >
                  <Link to={`/productDetails/${id}`}>
                    <img
                      src={images[0]}
                      alt="product img"
                      className="w-[130px] m-auto"
                    />
                  </Link>

                  <p className=" font-semibold text-[#202435] text-sm sm:text-base">
                   {title.slice(0,20)}
                  </p>

                  <p className="text-[#00B853] font-[500] text-sm sm:text-base">
                    IN STOCK
                  </p>

                  <div className="flex justify-center items-center gap-1">
                     <ProductRating averageRating={ratingsAverage}/>
                    <p className="text-[#71778E] text-sm">
                      reviews
                      </p>
                  </div>

                  <p className="text-[#D51243] font-bold text-[16px] sm:text-[18px] tracking-tight">
                    {price}$
                  </p>
     </div>
  )
}
