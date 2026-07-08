
import mainimg from '../Images/Background.jpeg';
import { useAppSelector ,useAppDispatch } from '../../Store/hooks';
import { getproducts } from '../../Store/getProuductsReducer';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

import Products from './SideBar/Products';



const AllProductsShop = () => {
    const{selectedcategory,hide,selectedBrand} = useAppSelector((state)=>state.categories);
    const {products,isloading}=useAppSelector((state)=>state.products);
    const [currentpage,setCurrentpage]=useState(1);
    const [sorted, setSorted] = useState<typeof products | null>( null);
    const dispatch = useAppDispatch();
    
 
  useEffect(()=>{
    dispatch(getproducts(currentpage))
  },[dispatch,currentpage])



  function handlenextpage(){
  setCurrentpage(currentpage+1)
  }

  function handleprevpage(){
  setCurrentpage(currentpage-1)
  }

function HandleSorted(e: React.ChangeEvent<HTMLSelectElement>) {
  const value = e.target.value;
  const sortedItems = [...products].sort((a, b) =>
    value === "AZ"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  setSorted(sortedItems);
 
}

const listToDisplay = sorted 
  ? sorted
  : selectedcategory 
    ? products.filter((item) => item.category.name === selectedcategory)
    : selectedBrand 
      ? products.filter((item) => item.brand.name === selectedBrand)
      : products;



  return (
    <div>
        <div className="w-full flex flex-col">
          <img src={mainimg} alt="shop image" className="w-full" />
          <div className="bg-[#F7F8FD] h-14 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 p-4 sm:p-7 text-[#9B9BB4] mb-4 mt-4">
            <div className="whitespace-nowrap text-sm sm:text-base">
              Sort by :
              <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>HandleSorted(e)}>
                <option value="AZ">Alphabetically, A-Z</option>
                <option value="ZA">Alphabetically, Z-A</option>
              </select>
            </div>
          </div>
            {
            isloading ? <Loader/> :
            <>
                {
                hide && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-4">
                 
                   {listToDisplay.map((item) => (
                    <Products {...item} key={item.id} />
                  ))}
                </div>
                        )
                }
            </> 
            }   
                
        </div>
          
          {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2 sm:gap-4">
          <button
            onClick={()=>handleprevpage()}
            disabled={currentpage ===1}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
          >
            Previous
          </button>
          <span className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-medium">
            Page  of 
          </span>
          <button
              disabled={currentpage === 2}
              onClick={()=>handlenextpage()}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
          > 
            Next
          </button>
        </div>
    </div>
  );
};

export default AllProductsShop;
