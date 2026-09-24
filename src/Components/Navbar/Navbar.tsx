import iconnav from '../images/iconnav.png'
import baketimg from '../images/basketimg.png';
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../../Store/hooks';
import { useNavigate } from 'react-router-dom';
import { Logout} from '../../Store/Authslice';
import { useEffect } from 'react';


export default function Navbar() {
    const [ismobile,setIsmobile]=useState<boolean>(false);
    const {token}=useAppSelector((state)=>state.auth);
    const navigate = useNavigate()
    const dispatch= useAppDispatch();
    const [lang, setLang] = useState<string>('en');

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);
    
    function logout():void{
       dispatch(Logout())
       navigate('/Login')
    }

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 500) {
      setIsmobile(false);
    }
  };

  handleResize();

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize); 
  };

  
}, []);


    
  return (
    <div>
        <div className="w-full bg-[#35AFA0] p-2 flex justify-center  items-center">
            <p className="font-normal text-white text-[12px] ">Due to current circumstances, there may be slight delays in order processing</p>
        </div>
        { token && 
        <>
          <div className='border-b border-[#E3E4E6]'>
              <div className='text-[12px] text-[#3E445A] font-medium flex items-center  justify-between flex-wrap w-[80%] max-sm:gap-2 mx-auto  p-2'>
                    <ul className="flex items-center gap-2">
                        <li><Link to="/About">About Us</Link></li>
                        <li>Compare</li>
                        <li><Link to='/wishlist'>Wishlist</Link></li>
                    </ul>
            
             
                <div className='sm:hidden  xl:flex items-center gap-6  flex-wrap max-sm:mt-0 xl:mt-0 xl:gap-0'>
                         <div>
                         <MdMenu className='w-10 h-10 max-sm:block hidden' onClick={()=>setIsmobile(!ismobile)}/>
                        </div>
                    <div className=' flex gap-3 max-sm:hidden items-center xl:border-r border-[#E3E4E6] pr-5 '>
                        <img src={iconnav} alt='icon-nav'></img>
                         <p className='max-sm:hidden'>100% Secure delivery without contacting the courier</p>
                    </div>
                    <div className='border-r max-sm:hidden border-[#E3E4E6] pl-5 pr-3'>  
                        <p >Need help? Call Us: <span className='text-[#35AFA0]'>  + 0020 500</span></p>
                    </div>
                    <div className='flex gap-2 items-center max-sm:hidden '>
                        <select className='border-2 p-2 rounded' onChange={(e)=>setLang(e.target.value)}>
                            <option value='en'>English</option>
                            <option value='ar'>Arabic</option>
                        </select>
                        <select className='border-2 p-2 rounded'>
                            <option>USD</option>
                            <option>Eg</option>
                        </select>
                    </div>

                </div>

                <div>
                      {token ?
                    <div className='border w-24 h-7  flex justify-center items-center rounded-2xl'>
                    <button className=' text-md font-bold cursor-pointer' onClick={()=>logout()}>Log out</button>
                    </div> :
                    ""}
                </div>
             </div>
          </div>
        <div className='w-[80%]  items-center  mx-auto flex flex-wrap justify-between p-1 border-b'>
            <div>
                <div className='flex items-center'>
                    <img src={baketimg} alt='basket-img' className='xl:w-16 w-10'></img>
                    <p className='text-[#35AFA0] basket xl:text-4xl font-bold text-xl'>Basket</p>
                </div>
                <p className='text-[#3E445A] text-[11px] font-medium'>Online Grocery Shopping Center</p>
            </div>
            <div className=' max-sm:hidden sm:hidden  lg:flex justify-between font-medium p-2  items-center max-sm:w-full   w-[50%] bg-[#F3F4F7] '>
                <input type='text' placeholder='Search products,clothes,..' className='w-full text-sm outline-none'></input>
                <CiSearch />

            </div>
            <div className='flex items-center gap-5 max-sm:mt-3'>
                <div className='border rounded-full xl:w-12 xl:h-12 w-8 h-8 flex justify-center items-center border-[#E2E4EC]'>
                    <Link to="/login"><CiUser className='xl:w-6 xl:h-6 w-4 h-4 ' /></Link>  

                </div>
                <p>$0.00</p>
                <div className='bg-[#FFF1EE] border-[#E2E4EC] border rounded-full  xl:w-12 xl:h-12 w-8 h-8 flex justify-center items-center'>
                <Link to="/cartpage"><FaShoppingCart className='xl:w-6 xl:h-6 w-4 h-4'/></Link>

                </div>
            </div>
           
        </div>
        <div className='w-[80%] mx-auto p-1 flex items-center justify-between flex-wrap max-sm:flex-col '>
            <div className='relative'>
                <div className='bg-[#35AFA0] w-60 h-12 rounded-3xl flex justify-center items-center'>
                     <select className='font-semibold text-[#FFFFFF]'>
                     <option  >ALL CATEGORIES</option>
                   </select>
                </div>
                <div className='bg-gray-400 w-28 p-1 rounded-2xl absolute top-9 left-7'>
                    <p className='text-[10px] font-semibold text-center '>TOTAL 50 PRODUCTS</p>
                </div>
               
            </div>
            <div>
                {
                    ismobile ? 
                    <ul className='flex sm:hidden md:flex md:flex-row text-[#35AFA0]  flex-col gap-5   font-bold flex-wrap mt-12 xl:mt-0 '>
                    <li className='border border-gray-400 rounded-2xl w-20 text-center cursor-pointer'>HOME</li>
                    <li>SHOP</li>
                     <li><Link to="/Blog">BLOG</Link></li>
                    <li>CHECKOUT</li>
                    <li><Link to="/Contact">CONTACT</Link></li>
                    </ul> :
                    <ul className='flex max-sm:hidden  gap-4  items-center font-semibold flex-wrap mt-10 xl:mt-0  '>
                        <li className='border  border-gray-400 hover:text-[#35AFA0] rounded-2xl w-20 text-center cursor-pointer'>
                            <Link to='/Home'>HOME</Link></li>
                        <li className='hover:text-[#35AFA0]'><Link to='/Shop' className='cursor-pointer' >SHOP</Link></li>
                        <li className='hover:text-[#35AFA0]'><Link to="/Blog">BLOG</Link></li>
                        <li className='hover:text-[#35AFA0]'><Link to="/checkout">CHECKOUT</Link></li>
                        <li className='hover:text-[#35AFA0]'><Link to="/Contact">CONTACT</Link></li>

                    </ul>
                }
              
            </div>
        </div>
        </>
        
        }
      
    </div>
  )
}
