import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { CartData } from "../types/types";
import type { RootState } from "./store";
import apiClient from "../services/axiosInstance";




export const AddtoCart = createAsyncThunk('Addtocart/Cart',

  async (id:string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const state =thunkAPI.getState() as RootState;
    const token = state.auth.token
    const data = {
      productId: id
    };
    
    try {
      const response = await apiClient.post(
        "cart",
        data,
        {
          headers: {
            token: token
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("تم إضافة المنتج إلى العربة بنجاح ✅");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("حدث خطأ أثناء إضافة المنتج ❌");
        return rejectWithValue(error.message);
      }
    }
  }
);

// eslint-disable-next-line react-refresh/only-export-components
export const getCart = createAsyncThunk('getCart/Cart',
  async (_, thunkAPI) => {
    const { rejectWithValue} = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    
    try {
      const response = await apiClient.get('cart', {
        headers: {
          token:token,
        }
      });
          return {
        cartId: response.data.cartId,
        products: response.data.data.products
      };

    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to load the cart ❌");
        return rejectWithValue(error.message);
      }
    }
  }
);

// eslint-disable-next-line react-refresh/only-export-components
export const updatequantitiy = createAsyncThunk('updatequantity/Cart',
    async({ id, newcount }: { id: string; newcount: number },thunkAPI)=>{
        const {rejectWithValue,dispatch}=thunkAPI;
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;
        const data ={
            count:newcount,
        }
        if(newcount<1){
          await  dispatch(RemovefromCart(id))
           dispatch(getCart())

        }else{
              try{
            await apiClient.put(`cart/${id}`,data,
                {
                    headers:{
                        token:token,
                }
              }
                
                
            )
        dispatch(getCart())

        }catch(error){
            if(error instanceof Error){
                return rejectWithValue(error.message)

            }
            
        }

        }
      
    }
)

export const RemovefromCart = createAsyncThunk('removecart/Cart',
    async (id:string,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
               const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;
        try{
           await apiClient.delete(`cart/${id}`,
                {
                    headers:{
                        token:token,
                    }
                }
            )
        }
        catch(error){
            if(error instanceof Error){
                return rejectWithValue(error.message)
            }
        }
    }
)
 

const initialState :CartData={
    cart:[],
    isloading:false,
    isError:false,
    cartId:'',
}

const Cartslice = createSlice({
    name:'Cart',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
          builder.addCase(getCart.pending, (state) => {
                state.isloading=true;
          
              })
            
            builder.addCase(getCart.fulfilled, (state,action) => {
                state.isloading=false;
                state.cart = action.payload?.products;
                state.cartId = action.payload?.cartId;
              })
               builder.addCase(getCart.rejected, (state) => {
                state.isloading=false;
                state.isError=true;
              })

    },
})

export default Cartslice.reducer;