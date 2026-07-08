
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch  } from '../Store/hooks';
import { Login } from '../Store/Authslice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const MyForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
const validationSchema = Yup.object().shape({
 
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

  const formik = useFormik({
    initialValues: {
      email: 'youssef.dev2025@example.com',
      password: 'Youssef@123',
    },
    validationSchema: validationSchema, 
    onSubmit:async (values) => {
        const result = await dispatch(Login(values))
        if(Login.fulfilled.match(result)){
            toast.success("🎉 Registered successfully!");
              navigate('/Home')
        }else{
              toast.error(`❌ Registration failed: ${result.payload}`);
        }
      console.log('Form submitted:', values);
    },
  });

  return (
    <>
    
   
 <div className='w-[80%] mx-auto my-14 '>
         {/* button login and register */}
            <div className='flex justify-between items-center'>
            <p className='font-bold text-sm border p-2 hover:bg-teal-400 hover:text-white border-gray-400 rounded-3xl'>
              <Link to="/about">About Us</Link>
              </p>
            <div className="flex items-center gap-2 sm:gap-4 text-sm text-gray-600 ml-auto">
                <Link
                  className="text-black-600 text-lg font-semibold transition-transform duration-300 hover:scale-110 hover:text-green-600"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-black-600 text-lg font-semibold transition-transform duration-300 hover:scale-110 hover:text-green-600"
                  to="/register"
                >
                  Register
                </Link>
         </div>

         </div>
          <h2 className="font-bold text-2xl py-5 text-green-500">Login : </h2>
           <form onSubmit={formik.handleSubmit}>
     
       <div>
        <label htmlFor="Email">Email:</label>
        <input
         className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          id="Email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
       <div>
        <label htmlFor="password">Password:</label>
        <input
        className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          id="password"
          name="password"
          type="passwrod"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      {/* Repeat for email and password fields */}

      <button 
      type="submit"
      className="bg-green-600 mt-6 hover:bg-green-700 cursor-pointer text-white font-semibold py-2 px-4 rounded"
      >Submit
      </button>
    </form>

 </div>
    </>
   
   
  );
};

export default MyForm;