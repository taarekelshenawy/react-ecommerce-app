import {  useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useAppDispatch } from "../../Store/hooks";
import { addToWishlist } from "../../Store/Wishlist";
import { removefromWishlist } from "../../Store/Wishlist";
import { AddtoCart } from "../../Store/AddtoCart";
import apiClient from "../../services/axiosInstance";

type displayedItemProps ={
  images:string[],
  imageCover:string,
  title:string,
  price:number,
  description:string,
  id:string,

}

const ProductDetails = () => {
  const { id } = useParams();
  const [displayedItem, setDisplayedItem] =useState<displayedItemProps | null>(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [display,setDisplay]=useState(false);
  const dispatch = useAppDispatch()


  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await apiClient.get(
          `products/${id}`
        );
        setDisplayedItem(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [id]);

  const images = displayedItem?.images || [];




  function handlewishlist(id :string | undefined){
    if(display){
            dispatch(removefromWishlist(id))
              setDisplay(!display)

    }else{
       dispatch(addToWishlist(id))
      setDisplay(!display)
    }

      
  }
  return (
    <div className="px-6">
      {/* Product Section */}
      <div className="flex flex-wrap justify-evenly gap-5 my-10">
        {/* Thumbnails */}
        <div className="firstColumn">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-[80px] rounded-[7px] mb-3 shadow-sm cursor-pointer ${
                selectedImg === img ? "border border-[#35AFA0]" : ""
              }`}
              alt="product"
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="secondCol">
          <img
            className="w-[400px] rounded-2xl"
            src={selectedImg || displayedItem?.imageCover}
            alt="product"
          />
        </div>

        {/* Details */}
        <div className="thirdCol ml-2 flex flex-col gap-4 max-w-[400px]">
          <h1 className="font-medium text-2xl">{displayedItem?.title}</h1>
          <p className="font-bold text-[22px]">{displayedItem?.price}$</p>
        

          <div
           onClick={()=>dispatch(AddtoCart(id))}
            className="bg-[#35AFA0] text-white flex justify-center items-center gap-2.5 py-2 px-[80px] rounded-[5px] cursor-pointer"
          >
            <FiShoppingCart />
            <p>Add to Cart</p>
          </div> 

          <div className="flex w-full items-center gap-2">
            <div 
            onClick={()=>handlewishlist(displayedItem?.id)}
             className="grow rounded-[4px] py-2.5 border
              border-[#DEE5EA] flex justify-center
               items-center gap-2 font-semibold cursor-pointer">
             {
              display ? <i className="fa-solid fa-heart text-red-500"></i> 
      
              :   <i className="fa-regular fa-heart text-xl text-red-500"></i> 
             }
                   
                      
              
              <span>Wishlist</span>
            </div>
            <div className="grow rounded-[4px] py-2.5 border border-[#DEE5EA] flex justify-center items-center gap-2 font-semibold cursor-pointer">
              <RiShareForwardLine className="text-2xl" />
              <span>Share</span>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-2">Product Details:</h1>
            <p className="text-sm text-[#595959] leading-[25px]">
              {displayedItem?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
