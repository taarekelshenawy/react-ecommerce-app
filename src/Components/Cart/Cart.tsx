import ProductRating from './ProductRating';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../Store/hooks";
import { useEffect } from 'react';
import { getCart } from '../../Store/AddtoCart';
import { useAppDispatch } from '../../Store/hooks';
import { updatequantitiy } from '../../Store/AddtoCart';

const Cart = () => {
  const {cart}=useAppSelector((state)=>state.Cart);
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getCart())
  },[dispatch])

  const sortedCartItems = [...cart].sort((a, b) =>
    a.product.title.localeCompare(b.product.title)
  );

  return (

    
    <div className='text-center  mt-10 mb-9' >
      <div className=" flex flex-wrap justify-center items-center gap-8">
          {sortedCartItems.length ? (
        sortedCartItems.map((item) => (
          <div
            className=" gap-2 border border-[#EDEEF5]  flex flex-col justify-center items-start  rounded-[8px] py-6 px-5"
            key={item._id}
          >
            <NavLink to={`/productDetails/${item.product._id}`}>
              <img
                src={item.product.imageCover}
                alt="cart img"
                className="w-[130px] m-auto "
              />
            </NavLink>
            <p className="font-[500]  text-[#202435] ">{item.product.title.split(" ").slice(0,2).join(' ')}</p>
            <p
              className={`text-[#00B853] font-[500] ${!item.product.quantity ? "line-through text-red-700" : ""
                }`}
            >
              IN STOCK
            </p>
            <div className="flex justify-center items-center gap-1">
              <ProductRating averageRating={item.product.ratingsAverage} />{" "}
              <p className=" text-[#71778E] ">reviews</p>
            </div>
            <p className="text-[#D51243] font-bold text-[18px] tracking-tight">
              ${item.price}
            </p>
            <div className="flex justify-between items-center w-full border  rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-2xl border-[#EDEEF5] mt-3">
              <div
                className="bg-[#EDEEF5] w-8 h-8 grid place-content-center rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                onClick={() =>
                  dispatch(updatequantitiy({id:item.product._id, newcount:item.count - 1}))
                }
              >
                <FiMinus />
              </div>
              <p>{item.count}</p>
              <div
                className="bg-[#FFCD00]  w-8 h-8  grid place-content-center rounded-tr-2xl rounded-br-2xl cursor-pointer "
                onClick={() =>
                   dispatch(updatequantitiy({id:item.product._id, newcount:item.count + 1}))
                }
              >
                {" "}
                <FiPlus />
              </div>
            </div>
          </div>
          
        ))
      ) : (
        <p className="my-10 m-auto text-3xl font-semibold text-[#35AFA0]">
          No Items i cart yet
        </p>

      )}
      <div>
  

      </div>
      

      </div>
      <div className="text-center">
            <Link  to='/check-out'>
            <button
              type='submit'
              className='px-20 py-3 mt-6 cursor-pointer  text-white rounded-full f_roboto bg-[#35AFA0]'
            >
              PayNow
            </button>
      </Link>

      </div>
         
    
       
    </div>
      
  
  );
};

export default Cart;
