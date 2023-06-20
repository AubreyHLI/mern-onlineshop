import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/products/getAllProducts`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const createProduct = createAsyncThunk('products/createProduct', async (newForm, {rejectWithValue}) => {
    try{
        const response = await axios.post(
            `${SERVER_URL}/products/createProduct`, 
            newForm, 
            { 
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true 
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

export const createNewReview = createAsyncThunk('products/createNewReview', async (newObj, {rejectWithValue}) => {
    try{
        const response = await axios.patch(
            `${SERVER_URL}/products/createNewReview`, 
            newObj, 
            { 
                withCredentials: true 
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


// create and export slice
export const productsSlice = createSlice({
    name: "products",
    initialState: {
       isLoadingProducts: true,
       allProducts: null,
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
        .addCase(fetchAllProducts.pending, (state) => {
            state.isLoadingProducts = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoadingProducts = false;
            state.allProducts = action.payload.products;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoadingProducts = false;
            state.error = action.payload.message;
        })
        .addCase(createProduct.pending, (state) => {
            state.isLoadingProducts = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoadingProducts = false;
            state.isSuccess = true;
            state.allProducts = action.payload.products;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoadingProducts = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(createNewReview.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.success = action.payload.message;
            state.allProducts = action.payload.products;
        })
        .addCase(createNewReview.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllProducts = (state) => state.products.allProducts;
export const getIsLoadingProducts = (state) => state.products.isLoadingProducts;

// a memorized selector, this selector will re-render only when parameters branchId or allProducts changed
export const selectProductsByBrand = createSelector(
    [selectAllProducts, (state, brandId) => brandId], 
    (allProducts, brandId) => {
        console.log('call me');
        return allProducts.filter(p => p.brandId === brandId);
    }
);

// export actions
export const { clearError, clearSuccess } = productsSlice.actions;

// export reducer
export default productsSlice.reducer;