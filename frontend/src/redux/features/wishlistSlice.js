import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/products/getWishItems`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const addProductToWishlist = createAsyncThunk('wishlist/addToWishlist', async (itemObj, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/products/addToWishlist`,itemObj,
        {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
            },
        });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});



export const deleteInWishlist = createAsyncThunk('wishlist/deleteProductInWishlist', async (id, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/products/deleteWishItem/${id}`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});



// create and export slice
export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishItems: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null
    },
    reducers: {
        clearError: (state, action) => {
            state.error = null;
            state.isError = false;
        },
        clearSuccess: (state, action) => {
            state.isSuccess = false;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchWishlist.fulfilled, (state, action) => {
            state.wishItems = action.payload.wishItems;            
        })
        .addCase(fetchWishlist.rejected, (state, action) => {
            state.error = action.payload.message;
        })
        .addCase(addProductToWishlist.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.wishItems = action.payload.wishItems; 
        })
        .addCase(addProductToWishlist.rejected, (state, action) => {
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(deleteInWishlist.fulfilled, (state, action) => {
            state.wishItems = action.payload.wishItems;
        })
        .addCase(deleteInWishlist.rejected, (state, action) => {
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllWishItems = (state) => state.wishlist.wishItems;
export const getLoadingItems = (state) => state.wishlist.isLoading;

// export actions
export const { clearError, clearSuccess } = wishlistSlice.actions;

// export reducer
export default wishlistSlice.reducer;