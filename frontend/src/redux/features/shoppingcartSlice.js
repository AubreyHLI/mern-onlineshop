import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/products/getCartItems`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (itemObj, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/products/addToCart/${itemObj.product._id}`, itemObj,
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

export const deleteProductInCart = createAsyncThunk('cart/deleteProductInCart', async (id, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/products/deleteCartItem/${id}`, { withCredentials: true });
        console.log('itemid:', id);
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const updateProductInCart = createAsyncThunk('cart/updateProductInCart', async (itemObj, {rejectWithValue}) => {
    try{
        const response = await axios.patch(`${SERVER_URL}/products/updateCartItem`, itemObj, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

// create and export slice
export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        cartItems: null,
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
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload.cartItems;     
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.error = action.payload.message;
        })
        .addCase(addProductToCart.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.cartItems = action.payload.cartItems; 
        })
        .addCase(addProductToCart.rejected, (state, action) => {
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        
        .addCase(deleteProductInCart.fulfilled, (state, action) => {
            state.cartItems = action.payload.cartItems;
        })
        .addCase(deleteProductInCart.rejected, (state, action) => {
            state.error = action.payload.message;
        })

        .addCase(updateProductInCart.pending, (state, action) => {
            state.isLoading = true;   
        })
        .addCase(updateProductInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.cartItems;            
        })
        .addCase(updateProductInCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllCartItems = (state) => state.shoppingCart.cartItems;
export const getLoadingItems = (state) => state.shoppingCart.isLoading;

// export actions
export const { clearError, clearSuccess } = shoppingCartSlice.actions;

// export reducer
export default shoppingCartSlice.reducer;