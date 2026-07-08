import { useEffect } from "react";
import { getcategoryproducts } from "../../../Store/Allcategoryslice";
import { useAppDispatch ,useAppSelector } from "../../../Store/hooks";
import { setSelectedCategory } from "../../../Store/Allcategoryslice";
import Loader from "../../Loader/Loader";


const SideBarCategories = () => {
  const dispatch = useAppDispatch();
  const{selectedcategory,isloading} = useAppSelector((state)=>state.categories);
  const {data}=useAppSelector((state)=>state.categories)
  
  useEffect(()=>{
    dispatch(getcategoryproducts())
  },[dispatch])


 
  return (
    <div className="allCatgeories text-[#71778E] flex flex-col gap-1">
      <h1 className="font-semibold text-[#202435] mb-3 text-sm sm:text-base">
        PRODUCT CATEGORIES
      </h1>
      {
        isloading ? <Loader/> : 
        <>
        {
        data?.map((item)=>{
          return(
            <div className="flex items-center" key={item._id}>
                <input
                  type="radio"
                  id={`category${item._id}`}
                  className="accent-blue-700 w-4 h-4"
                  name="drone"
                  checked={selectedcategory === item.name}
                  onChange={(e)=>dispatch(setSelectedCategory(e.target.value))}
                  value={item.name}
                />
                <label
                htmlFor={`category${item._id}`}
                  className="ml-3 text-sm sm:text-base"
                >
                  {item.name}
                </label>
            </div>

        )
      })
    }

        </>
      }
      
     
      
   
    </div>
       

        
         
  );
};

export default SideBarCategories;
