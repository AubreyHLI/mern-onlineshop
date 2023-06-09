import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchAllCoupons = createAsyncThunk('events/fetchAllCoupons', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/coupons/getAllCoupons`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const createCoupon = createAsyncThunk('events/createCounpon', async (newCoupon, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/coupons/createCoupon`, 
            newCoupon, 
            { 
                headers: { "Access-Control-Allow-Credentials": true },
                withCredentials: true,
            }
        );
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, {rejectWithValue}) => {
//     try{
//         const response = await axios.delete(`${SERVER_URL}/events/deleteEvent/${eventId}`);
//         return response.data;
//     } catch(err) {
//         if (!err.response) {
//             throw err;
//         }
//         return rejectWithValue(err.response.data);
//     }
// });


// export const deleteEventsByProduct = createAsyncThunk('events/deleteEventsByProduct', async (productId, {rejectWithValue}) => {
//     try{
//         const response = await axios.delete(`${SERVER_URL}/events/deleteProductEvents/${productId}`);
//         return response.data;
//     } catch(err) {
//         if (!err.response) {
//             throw err;
//         }
//         return rejectWithValue(err.response.data);
//     }
// });


// create and export slice
export const couponsSlice = createSlice({
    name: "coupons",
    initialState: {
        isLoading: true,
        allCoupons: null,
        isSuccess: false,
        success: null,
        isError: false,
        error: null,
    },
    reducers: {
        clearError: (state, action) => {
            state.isError = false;
            state.error = null;
        },
        clearSuccess: (state, action) => {
            state.isSuccess = false;
            state.success = null;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllCoupons.pending, (state) => {
            state.isLoading= true;
        })
        .addCase(fetchAllCoupons.fulfilled, (state, action) => {
            state.isLoading= false;
            state.allCoupons = action.payload.coupons;
        })
        .addCase(fetchAllCoupons.rejected, (state, action) => {
            state.isLoading= false;
            state.error = action.payload.message;
        })
        .addCase(createCoupon.pending, (state) => {
            state.isLoading= true;
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading= false;
            state.isSuccess = true;
            state.success =  action.payload.message;
            state.allCoupons = action.payload.coupons;
        })
        .addCase(createCoupon.rejected, (state, action) => {
            state.isLoading= false;
            state.isError = true;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllCoupons = (state) => state.coupons.allCoupons;
export const getIsLoadingCoupons = (state) => state.coupons.isLoading;

// export actions
export const { clearError, clearSuccess } = couponsSlice.actions;

// export reducer
export default couponsSlice.reducer;