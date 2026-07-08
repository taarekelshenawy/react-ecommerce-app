import  { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../../Store/hooks";
import { getcategoryBrands } from "../../../Store/Allcategoryslice";
import { setSelectedBrand } from "../../../Store/Allcategoryslice";
import Loader from "../../Loader/Loader";


const SideBarBrands = () => {
  const dispatch = useAppDispatch();
  const {brands,isloading}=useAppSelector((state)=>state.categories)

  useEffect(()=>{
    dispatch(getcategoryBrands())
  },[dispatch])

  return (
    <div className="allBrands text-[#71778E] flex flex-col gap-1 mt-6 md:mt-14">
      <h1 className="font-semibold text-[#202435] mb-3 text-sm sm:text-base">
        BRANDS
      </h1>
      {
        isloading ? <Loader/> :
        <>
            {
      brands?.map((item,index)=>{
        return(
          <div  className="flex items-center" key={index}>
              <input
                type="radio"
                className="accent-blue-700 w-4 h-4"
                name="brand"
                onChange={(e)=>dispatch(setSelectedBrand(e.target.value))}
                value={item.name}
                id={`${item._id}`}
              />
              <label
              htmlFor={`${item._id}`}
                className="ml-3 text-sm sm:text-base"
              >
                {item.name}
              </label>
            </div>
        )
      })}
        </>
      }
  
        
     
    </div>
  );
};

export default SideBarBrands;
