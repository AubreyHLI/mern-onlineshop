import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";


export const fetchUserOrders = createAsyncThunk('order/getUserAllOrders', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/orders/getUserAllOrders`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const createOrder = createAsyncThunk('order/createOrder', async (newForm, {rejectWithValue}) => {
    try{
        const response = await axios.post(
            `${SERVER_URL}/orders/createOrder`, 
            newForm, 
            { 
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
        );
        // clear cart items
        await axios.delete(`${SERVER_URL}/products/clearCart`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const fetchAllOrders = createAsyncThunk('order/getAllOrders', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/orders/adminAllOrders`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

// create and export slice
export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        allOrders: null,
        userOrders: null,
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
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUserOrders.pending, (state) => {
            // state.isLoading= true;
        })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            // state.isLoading= false;
            state.userOrders = action.payload.orders;
        })
        .addCase(fetchUserOrders.rejected, (state, action) => {
            // state.isLoading= false;
            state.error = action.payload.message;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.success = action.payload.message;
            state.userOrders = action.payload.orders;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })

        .addCase(fetchAllOrders.pending, (state) => {
            // state.isLoading= true;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            // state.isLoading= false;
            state.allOrders = action.payload.orders;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            // state.isLoading= false;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectUserAllOrders = (state) => state.order.userOrders;
export const selectAllOrders = (state) => state.order.allOrders;

// export actions
export const { clearError, clearSuccess } = orderSlice.actions;

// export reducer
export default orderSlice.reducer;