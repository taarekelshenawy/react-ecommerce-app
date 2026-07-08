import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RegisterProps ,loginProps,authprops} from '../types/types';
import apiClient from '../services/axiosInstance';


// First, create the thunk

export const Register = createAsyncThunk('register/auth',
  async (data:RegisterProps,thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
     try {
        await apiClient.post('auth/signup',data);
   
  } catch (error) {
    if(error instanceof Error){
         return rejectWithValue(error.message);
    }
   
  }
}
)

// Login function
export const Login = createAsyncThunk('login/auth',
  async (data:loginProps,thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
     try {
      const response = await apiClient.post('auth/signin',data);
       localStorage.setItem('token',response.data.token)
        return response.data.token;
   
  } catch (error) {
    if(error instanceof Error){
         return rejectWithValue(error.message);

    }
   
  }
}


)


const initialState:authprops={
    token:localStorage.getItem('token') || '',
    isloading:false,
    isError:false,
}


// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   Logout:(state)=>{
    state.token =''
    localStorage.removeItem('token');
   }
   
  },
  extraReducers: (builder) => {
    //  auth register
    builder.addCase(Register.pending, (state) => {
        state.isloading=true;
  
      })
    
    builder.addCase(Register.fulfilled, (state) => {
        state.isloading=false;
         console.log("✅ Register successful!");
       
  
      })
       builder.addCase(Register.rejected, (state) => {
        state.isloading=false;
        state.isError=true;
    
  
      })
      
    //   auth login
       builder.addCase(Login.pending, (state) => {
        state.isloading=true;
  
      })
    
    builder.addCase(Login.fulfilled, (state,action) => {
        state.isloading=false;
        state.token = action.payload;
  
      })
       builder.addCase(Login.rejected, (state) => {
        state.isloading=false;
        state.isError=true;
    
  
      })
     
  },
})

// eslint-disable-next-line react-refresh/only-export-components
export const {Logout}=authSlice.actions;

export default authSlice.reducer;