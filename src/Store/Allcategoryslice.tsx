import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CategoriesData } from "../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../services/axiosInstance";



export const getcategoryproducts =createAsyncThunk('getcategory/categories',
    async (_,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI
    try{
        const response = await apiClient.get("categories")
        return response.data.data;

    }catch(error)
    {
        if(error instanceof Error){
           return  rejectWithValue(error.message)
        }
       

    }

})


export const getcategoryBrands =createAsyncThunk('getbrands/categories',
    async (_,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI
    try{
        const response = await apiClient.get("brands")
        return response.data.data;

    }catch(error)
    {
        if(error instanceof Error){
            return rejectWithValue(error.message)

        }
    }

})


const initialState:CategoriesData={
     data:[],
     brands:[],
    isloading:false,
    iserror:false,
    selectedcategory:'',
    hide:true,
    selectedBrand:''

}


const Categoriesslice = createSlice({
    name:'categories',
    initialState,
    reducers:{
        setSelectedCategory:(state,action:PayloadAction<string>)=>{
            state.selectedcategory=action.payload;

        },
        setSelectedBrand:(state,action:PayloadAction<string>)=>{
            state.selectedBrand = action.payload;

        },
        setHide:(state,action:PayloadAction<boolean>)=>{
            state.hide=action.payload

        }

    },
    extraReducers:(builder)=>{
         builder.addCase(getcategoryproducts.pending, (state) => {
                state.isloading=true;
              })
            
            builder.addCase(getcategoryproducts.fulfilled, (state,action) => {
                state.isloading=false;
                state.data = action.payload
                 console.log("✅ Register successful!");
               
          
              })
               builder.addCase(getcategoryproducts.rejected, (state) => {
                state.isloading=false;
                state.iserror=true;
            
          
              })
              
            //   get brands
             builder.addCase(getcategoryBrands.pending, (state) => {
                state.isloading=true;
          
              })
            
            builder.addCase(getcategoryBrands.fulfilled, (state,action) => {
                state.isloading=false;
                state.brands = action.payload
                 console.log("✅ Register successful!");
               
          
              })
               builder.addCase(getcategoryBrands.rejected, (state) => {
                state.isloading=false;
                state.iserror=true;
            
          
              })

    }
    

})

export const { setSelectedCategory,setHide,setSelectedBrand } = Categoriesslice.actions;
export default Categoriesslice.reducer;
  
    
