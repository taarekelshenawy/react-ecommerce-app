import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { RootState } from "./store";
import apiClient from "../services/axiosInstance";


export const addToWishlist = createAsyncThunk('addtowishlist/wishlist',
  async (id:string | undefined, thunkAPI) => {
    const data = {
      productId: id
    };
    const { rejectWithValue } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await apiClient.post(
        'wishlist',
        data,
        {
          headers: {
            token: token,
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added to wishlist successfully ✅');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to add product to wishlist ❌');
        return rejectWithValue(error.message);
      }
    }
  }
);



export const removefromWishlist = createAsyncThunk('removefromwishlist/wishlist',
  async (id : string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
        const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await apiClient.delete(
        `wishlist/${id}`,
        {
          headers: {
            token: token
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Product removed from wishlist successfully 🗑️');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to remove product from wishlist ❌');
        return rejectWithValue(error.message);
      }
    }
  }
);


export const getwhishlist = createAsyncThunk('getwishlist/wishlist',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await apiClient.get(
        `wishlist`,
        {
          headers: {
            token: token,
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Wishlist loaded successfully 📦');
        return response.data.data;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to load wishlist ❌');
        return rejectWithValue(error.message);
      }
    }
  }
);


type stateProps ={
    cartwishlist:{
        id:string,
        imageCover:string,
        title:string,
        price:number,
    }[],
    isloading:boolean,
    isError:boolean,
}

const initialState :stateProps={
    cartwishlist:[],
    isloading:false,
    isError:false,
}



const Wishlist = createSlice({
    name:'wishlist',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        
       builder.addCase(getwhishlist.pending, (state) => {
           state.isloading=true;
     
         })
       
       builder.addCase(getwhishlist.fulfilled, (state, action) => {
           state.isloading=false;
           state.cartwishlist = action.payload;
     
         })
          builder.addCase(getwhishlist.rejected, (state) => {
           state.isloading=false;
           state.isError=true;
       
     
         })
        
     },
})

export default Wishlist.reducer;