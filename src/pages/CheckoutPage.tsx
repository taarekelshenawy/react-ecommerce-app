import { useFormik } from 'formik';
import {useAppDispatch ,useAppSelector} from '../Store/hooks';
import { paymentFunction } from '../Store/Checkoutsession';
import { getCart } from '../Store/AddtoCart';
import { useEffect } from 'react';


const CheckOut = () => {
    const dispatch = useAppDispatch();
    const {cartId}=useAppSelector((state)=> state.Cart);
    const {cart} = useAppSelector((state)=>state.Cart);

    console.log(cartId)

    useEffect(()=>{
        dispatch(getCart())

    },[dispatch])

    
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: (values) => {
          dispatch(paymentFunction({ data: values, cartId }));
        },
    });


    

    return (
        <div className='font-[Inter] flex flex-col-reverse md:flex-row justify-center '>
        
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-9 px-8 '>
                        <div className="text-center">
                             <p className='text-[#35AFA0] pb-5 font-bold text-xl '>Complete Your Payment in One Quick Step!</p>
                        </div>

                        <div className="text-center">
                            <div className="mb-4">
                                <input
                                     className='w-full border border-gray-200 outline-gray-300 px-4 py-3 rounded-full'
                                    name='details'
                                    id='details'
                                    type="text"
                                    placeholder='Details'
                                    onChange={formik.handleChange}
                                    value={formik.values.details}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.details && formik.errors.details ? (
                                    <div className='text-red-500'>{formik.errors.details}</div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <input
                                    className='w-full border  border-gray-200 outline-gray-300 px-4 py-3 rounded-full'
                                    name='phone'
                                    id='phone'
                                    type="tel"
                                    placeholder='Phone'
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className='text-red-500'>{formik.errors.phone}</div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <input
                                     className='w-full border border-gray-200 outline-gray-300 px-4 py-3 rounded-full'
                                    name='city'
                                    id='city'
                                    type="text"
                                    placeholder='City'
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <div className='text-red-500'>{formik.errors.city}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                             
                                type='submit'
                                disabled={!(formik.isValid && formik.dirty)}
                                className=' w-full px-14 py-3 cursor-pointer  text-2xl text-white rounded-full  bg-[#35AFA0]'
                            >
                                PayNow
                            </button>
                        </div>

                </div>
                    
            </form>
          

            <div className=' flex-col   pb-14  md:pb-0 md:border-l-2 md:border-gray-300 px-4 '>
                {
                    cart &&
                cart.map((item, index) => (
                    <div key={index} className='flex items-center justify-between p-4 gap-10'>
                        <img width={64} src={item.product.imageCover} alt='product-image' className='ml-3' />
                        <div className='flex items-center p-1'>
                             <span className='px-1 text-[#35AFA0] mr-2 font-semibold text-lg '>{item.count}x  </span>
                             <p className='font-bold'>{item.product.title.split(" ").slice(0,2).join(' ')}</p>
                             </div>
                             <p className='text-red-500 font-bold text-lg'>{item.price} $</p>

                    </div>
                ))}
                <div className='flex items-center justify-between ml-2 py-3'>
                    <p className='text-[#35AFA0] text-2xl font-bold'>Shipping</p>
                    <p className='font-bold'>FREE</p>
                </div>
                <div className='flex justify-between items-center mt-2 ml-2 '>
                    <div >
                        <p className='font-bold text-2xl my-2 '>Total</p>
                        <p className='text-gray-400'>including $2.46 in taxes</p>
                    </div>
                    {/* <div>

                        <p className='text-red-500 font-bold text-xl '> $ {response?.data?.totalCartPrice || 0}</p>

                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
