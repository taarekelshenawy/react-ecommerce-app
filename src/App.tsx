import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './Components/Register/Register';
import { ToastContainer } from 'react-toastify';
import WholeMainShopPage from './pages/Shop';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import WishList from './pages/WishlistPage';
import Guard from './Components/Guard/Guard';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Blog from './pages/BlogPage';
import ContactUs from './pages/ContactusPage';
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckoutPage';
import Authdirect from './Components/Authdirect/Authdirect';



function App() {
 const router= createBrowserRouter([
  { path: "/", element: <Layout/> ,
     children: [
      {path:'',element:<Authdirect/>},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {path:'About',element:<About/>},
      {path:'Blog',element:<Blog/>},
      {path:'Contact',element:<ContactUs/>},
      {path:'cartpage',element:<CartPage/>},
     { path: 'Shop', element: (
      <Guard>
          <WholeMainShopPage />
      </Guard>)
    },
     {path:'wishlist',element:(
      <Guard>
           <WishList/>
      </Guard>
     )
    },
    {
          path: "productDetails/:id",
          element: (
          <Guard>
              <ProductDetails />
          </Guard>

          ),
      },
      {
          path: "Home",
          element: (
          <Guard>
              <Home/>
          </Guard>

          ),
      },
      {
          path: "checkout",
          element: (
          <Guard>
              <CheckOut/>
          </Guard>

          ),
      },
     
    ]
  }
]);
 

  return (
  
  
    <>
      <ToastContainer/>
      <RouterProvider
        router={router}
      />
   
    </>
  )
}

export default App;
