import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchAllEvents = createAsyncThunk('events/fetchAllEvents', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/events/getAllEvents`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const createEvent = createAsyncThunk('events/createEvent', async (newForm, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/events/createEvent`, 
            newForm, 
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


export const fetchEventsByBrand = createAsyncThunk('events/fetchEventsByBrand', async (brandId, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/events/getBrandEvents/${brandId}`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const deleteEventById = createAsyncThunk('events/deleteEvent', async (eventId, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/events/deleteEvent/${eventId}`);
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


export const deleteEventsByProduct = createAsyncThunk('events/deleteEventsByProduct', async (productId, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/events/deleteProductEvents/${productId}`);
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


// create and export slice
export const eventsSlice = createSlice({
    name: "events",
    initialState: {
        isLoading: true,
        allEvents: null,
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
        .addCase(fetchAllEvents.pending, (state) => {
            state.isLoading= true;
        })
        .addCase(fetchAllEvents.fulfilled, (state, action) => {
            state.isLoading= false;
            state.allEvents = action.payload.events;
        })
        .addCase(fetchAllEvents.rejected, (state, action) => {
            state.isLoading= false;
            state.error = action.payload.message;
        })
        
        .addCase(createEvent.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.allEvents = action.payload.events;
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(fetchEventsByBrand.pending, (state) => {
            state.isLoading= true;
        })
        .addCase(fetchEventsByBrand.fulfilled, (state, action) => {
            state.isLoading= false;
            state.brandEvents = action.payload.events;
        })
        .addCase(fetchEventsByBrand.rejected, (state, action) => {
            state.isLoading= false;
            state.error = action.payload.message;
        })
       
        .addCase(deleteEventById.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.success = action.payload.message;
            state.allEvents = action.payload.events;
        })
        .addCase(deleteEventById.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
      
        .addCase(deleteEventsByProduct.fulfilled, (state, action) => {
            state.isLoading= false;
            state.message = action.payload.message;
        })
        .addCase(deleteEventsByProduct.rejected, (state, action) => {
            state.isLoading= false;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it
export const selectAllEvents = (state) => state.events.allEvents;
export const getIsLoadingEvents = (state) => state.events.isLoading;

// export actions
export const { clearError, clearSuccess } = eventsSlice.actions;

// export reducer
export default eventsSlice.reducer;