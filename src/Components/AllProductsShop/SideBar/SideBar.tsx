
import SideAvailability from "./SideAvailability";
import SideBarBrands from './SideBarBrands';
import SideBarCategories from './SideBarCategories';

const SideBar = () => {
  
  return (
    <div className="w-full md:w-[250px] lg:w-[300px] bg-white p-4 rounded-lg shadow-md md:shadow-none">
      <SideBarCategories/>
      <SideBarBrands />
      <SideAvailability />
    </div>
  );
};

export default SideBar;
