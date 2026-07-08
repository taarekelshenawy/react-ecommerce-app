import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import CartRight from "../Components/Cart/CartRight";

const ShopPage = () => {
  return (
    <div className="wholeShop mx-7 mt-14">
      <div className="mb-4 ml-4">
        <NavLink to="/home">
          <span className="font-[600]">Home</span>{" "}
          <IoIosArrowForward className="inline" />
        </NavLink>
        <NavLink to="/shop">
          <span className="font-[600]">Products</span>{" "}
          <IoIosArrowForward className="inline" />
        </NavLink>
      </div>

      <div className=" ">
        <CartRight />
      </div>
    </div>
  );
};

export default ShopPage;
