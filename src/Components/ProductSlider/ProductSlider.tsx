import { Navigation, Pagination,  A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppSelector ,useAppDispatch } from "../../Store/hooks";
import { getproducts } from "../../Store/getProuductsReducer";
import { useEffect } from "react";
import Loader from '../Loader/Loader';
import { Link } from "react-router-dom";

export default function ProductSlider() {
  const {products,isloading} = useAppSelector((state)=>state.products);
  const dispatch = useAppDispatch();
 
  useEffect(()=>{
    dispatch(getproducts(1))
  },[dispatch])

  return (
    <div className="productslider w-[80%] mx-auto mb-14">
 
        <Swiper
          breakpoints={{
            380: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            960: {
              slidesPerView: 4,
            },
            1250: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={5}
          navigation
        >
          {isloading ? <Loader/>:
          <>
              {Array.isArray(products) &&
            products.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="flex justify-center border-1 border-[#E4E5EE] p-4">
                      <div className="w-[234px] h-[241px]  flex flex-col items-center justify-center gap-3 ">
                        <Link to={`/productDetails/${item.id}`}>
                        <img
                          src={item.images[0]}
                          className="w-[145px] h-[145px] hover:scale-105"
                          alt="product-image"
                        ></img>
                        </Link>
                        <p className="font-bold">{item.title.split(' ').slice(0,3).join(' ')}</p>
                        <p>{item.quantity} items</p>
                      </div>
                  
                  </div>
                </SwiperSlide>
              );
            })}
          </>
          }
      
        </Swiper>
      
    </div>
  );
}
