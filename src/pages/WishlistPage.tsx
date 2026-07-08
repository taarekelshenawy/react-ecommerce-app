import {  useEffect } from 'react';
import { getwhishlist } from '../Store/Wishlist';
import { useAppSelector } from '../Store/hooks';
import { useAppDispatch } from '../Store/hooks';


export default function WishList() {
  const dispatch = useAppDispatch()
 const { cartwishlist}=useAppSelector((state)=>state.wishlist);


 


 useEffect(()=>{
 dispatch(getwhishlist())
},[dispatch])


  
  return (
    <>
  
    <div className="pb-10 text-[Dosis]">
      <div className='container mx-auto xl:px-50 px-10 '>
   
       <div className="py-6 ">
           <h2 className='text-2xl font-bold font-[Dosis]'>Wish List :</h2>
       </div>
     
     <table className="w-full ">
     <tbody>
                   {cartwishlist.length === 0 ? (
                     <tr>
                       <td colSpan={6} className="py-4 text-center">No items in the Wishlist</td>
                     </tr>
                   ) : (
                    cartwishlist.map((item) => (
                       <tr key={item.id} className="bg-white py-5 mb-5">
                         <td className="py-2 ps-3">
                           <img className=" mx-auto" src={item.imageCover} width="100" alt="Product" />
                         </td>
                         <td>
                           <p className="font-bold text-sm md:text-xl">{item.title?.split(" ").slice(0,5).join(" ")}</p>
                           <p className='text-[#35AFA0] text-xl font-semibold py-1 font-[Dosis]'>$ {item.price}</p>
                         </td>
                         
                       </tr>
                     ))
                   )}
                 </tbody>

   </table>

   </div>
   </div>
   
   </>
  )
}