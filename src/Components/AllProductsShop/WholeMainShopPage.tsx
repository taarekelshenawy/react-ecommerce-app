import { NavLink } from "react-router-dom";
import AllProductsShop from "./AllProductsShop.js";
import { IoIosArrowForward } from "react-icons/io";
import SideBar from "./SideBar/SideBar.js";
import { useState, useEffect, useCallback } from "react";

const WholeMainShopPage = () => {

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
 

   const handleResize = useCallback(() => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    },[]);



  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    
    <div className=" w-[80%] mx-auto mb-10">
      <div className="flex items-center justify-between">
        <NavLink to="/home" className="text-sm md:text-base">
          <span className="font-[600]">Home</span>{" "}
          <IoIosArrowForward className="inline" />
        </NavLink>
        {isMobile && (
          <button
            className="md:hidden bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-cyan-400 transition duration-300"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Filters" : "Show Filters"}
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        {(!isMobile || showSidebar) && (
          <SideBar 
        />
        )}
        <AllProductsShop  />
      </div>
    </div>
  );
};

export default WholeMainShopPage;
