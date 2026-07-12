
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Register } from '../../Store/Authslice';
import { useAppDispatch } from '../../Store/hooks';
  import {  toast } from 'react-toastify';
  import { Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';



const MyForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
  
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  rePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')

    .required('Phone is required'),
});


  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      password: '',
      rePassword:'',
      phone:''
    },
    validationSchema: validationSchema, // Use the Yup schema defined earlier
    onSubmit:async(values) => {
        const result = await dispatch(Register(values));

   if (Register.fulfilled.match(result)) {
      toast.success(" Registered successfully!");
      navigate('/Home')
      
    } else if (Register.rejected.match(result)) {
      toast.error(` Registration failed: ${result.payload}`);
    }
  
      // Handle form submission here (e.g., send data to an API)
      console.log('Form submitted:', values);
    },
  });

  return (
   <>
         <div className='w-[80%] mx-auto mt-10 mb-4'>
         {/* button login and register */}
         <div className='flex justify-between items-center'>
            <p className='font-bold text-2xl'>About Us</p>
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
         
     
          <h2 className="font-bold text-2xl py-5 text-green-500">Register : </h2>
           <form onSubmit={formik.handleSubmit}>
              <div>
        <label htmlFor="name">Name:</label>
        <input
        className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='text-red-600'>{formik.errors.name}</div>
        ) : null}
            </div>
     
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
                <div  className='text-red-600'>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                <div  className='text-red-600'>{formik.errors.password}</div>
                ) : null}
            </div>
        <div>
        <label htmlFor="ٌrePassword">rePassword:</label>
        <input
        className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          id="rePassword"
          name="rePassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
        />
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div  className='text-red-600'>{formik.errors.rePassword}</div>
        ) : null}
      </div>
        <div>
        <label htmlFor="phone">Phone:</label>
        <input
        className="w-full mt-3 mb-2 p-1 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div  className='text-red-600'>{formik.errors.phone}</div>
        ) : null}
      </div>

      {/* Repeat for email and password fields */}

      <button 
      type="submit"
      className="bg-green-600 mt-6 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >Submit
      </button>
     
             </form>
    

    </div>
   </>
        
   
  );
};

export default MyForm;