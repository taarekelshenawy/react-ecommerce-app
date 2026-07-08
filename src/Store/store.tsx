import { configureStore } from '@reduxjs/toolkit';
import productSlice from './getProuductsReducer';
import authslice from './Authslice';
import  Categoriesslice from './Allcategoryslice';
import Cartslice from './AddtoCart';
import Wishlist from './Wishlist'


export const store = configureStore({
  reducer: {
    products:productSlice,
    auth:authslice,
    categories: Categoriesslice,
    Cart:Cartslice,
    wishlist:Wishlist,
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;