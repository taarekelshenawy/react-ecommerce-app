import Navbar from "../Components/Navbar/Navbar";
import Footer from '../Components/Footer/BottomFooter';
import Newsletter from "../Components/Newsletter/Newsletter";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  

export default function Layout() {
  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <div className="mt-10"></div>
        <Outlet/>
        <Newsletter/>
        <Footer/>

    </div>
  )
}
