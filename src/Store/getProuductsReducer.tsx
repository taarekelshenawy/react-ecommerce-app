import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ProductsData } from '../types/types';
import apiClient from '../services/axiosInstance';
import { isAxiosError } from 'axios';


// First, create the thunk
export const getproducts = createAsyncThunk('getproducts/products',
  async ( num:number=1,thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
    const response = await apiClient.get(`products?page=${num}`);
      return response.data.data;
  } catch (error) {
    if(isAxiosError(error)){
      return rejectWithValue(error.response?.data.message)
    }
    if(error instanceof Error){
         return rejectWithValue(error.message);
    }
   
  }
}


)




const initialState :ProductsData={
    products:[],
    isloading:false,
    isError:false,
}


// Then, handle actions in your reducers:
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getproducts.pending, (state) => {
        state.isloading=true;
  
      })
    
    builder.addCase(getproducts.fulfilled, (state, action) => {
        state.isloading=false;
        state.products = action.payload;
  
      })
       builder.addCase(getproducts.rejected, (state) => {
        state.isloading=false;
        state.isError=true;
  
      })
     
  },
})

export default productSlice.reducer;

