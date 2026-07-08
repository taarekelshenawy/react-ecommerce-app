import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../services/axiosInstance";

// نوع بيانات الشحن
type CheckoutDetails = {
  details: string;
  phone: string;
  city: string;
};

// نوع بيانات الـ state
interface CheckoutState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// الحالة الابتدائية
const initialState: CheckoutState = {
  loading: false,
  error: null,
  success: false,
};
type PaymentResponse = {
  status: string;
  session: {
 success_url:string,
  cancel_url:string,
    url: string;
  };
};

// AsyncThunk للدفع
export const paymentFunction = createAsyncThunk<
  PaymentResponse, // يمكنك تحديد نوع الاستجابة هنا لو عندك الـ response type
  { data: CheckoutDetails; cartId: string },
  { rejectValue: string }
>(
  "checkout/payment",
  async ({ data, cartId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
       // يفضل داخل الـ thunk
      const response = await apiClient.post(
        `orders/checkout-session/${cartId}?url=https://github.com/ecommerce-dev-team/Ecommerce-website.git`,
        data,
        {
          headers: {
            token: token || "",
          },
        }
      );

      // توجيه المستخدم إلى صفحة الدفع
      window.location.href = response.data.session.url;

      return response.data;
    } catch (error) {
      if(error instanceof Error){
            return rejectWithValue(error.message || "Something went wrong");

      }
  
    }
  }
);

// Slice
const checkoutSession = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentFunction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(paymentFunction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(paymentFunction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to checkout";
        state.success = false;
      });
  },
});

export default checkoutSession.reducer;



