import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchAllBrands = createAsyncThunk('brands/fetchAllBrands', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/brands/getAllBrands`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const createBrand = createAsyncThunk('brands/createBrand', async (newForm, {rejectWithValue}) => {
    try{
        const response = await axios.post(
            `${SERVER_URL}/brands/createBrand`, 
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


export const deleteBrandById = createAsyncThunk('cart/deleteBrand', async (id, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/brands/deleteBrand/${id}`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});




// create and export slice
export const brandsSlice = createSlice({
    name: "brands",
    initialState: {
       isLoadingBrands: true,
       allBrands: null,
       brand: null,
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
        .addCase(fetchAllBrands.pending, (state) => {
            state.isLoadingBrands = true;
        })
        .addCase(fetchAllBrands.fulfilled, (state, action) => {
            state.isLoadingBrands = false;
            state.allBrands = action.payload.brands;
        })
        .addCase(fetchAllBrands.rejected, (state, action) => {
            state.isLoadingBrands = false;
            state.error = action.payload.message;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.allBrands = action.payload.brands;
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(deleteBrandById.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.allBrands = action.payload.brands;
            state.success = action.payload.message;
        })
        .addCase(deleteBrandById.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllBrands = (state) => state.brands.allBrands;
export const getIsLoadingBrands = (state) => state.brands.isLoadingBrands;

// export actions
export const { clearError, clearSuccess } = brandsSlice.actions;

// export reducer
export default brandsSlice.reducer;