import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../static/server";

/* aynsc actions defined by createAsyncThunk, outside of slice */
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/users/getuser`, { withCredentials: true });
        console.log(response);
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (inputData, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/users/login`, inputData, { withCredentials: true } // include cookies and authentication headers in your XHR request (cors)
        ); 
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/users/logout`, { withCredentials: true });     
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const loginAdmin = createAsyncThunk('user/loginAdmin', async (inputData, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${SERVER_URL}/users/loginAdmin`, inputData, { withCredentials: true } // include cookies and authentication headers in your XHR request (cors)
        ); 
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${SERVER_URL}/users/getAllUsers`, { withCredentials: true });
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


// create and export slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: 'idle' ,//'idle' | 'loading' | 'finish',
        isAdmin: false,
        isSuccess: false,
        isError: false
    },
    reducers: {
        clearError: (state, action) => {
            state.error = null;
            state.isError = false;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = 'finish';
            state.user = action.payload.user;            
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = 'finish';
            state.isAuthenticated = false;
            state.error = action.payload.message;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = 'finish';
            state.user = action.payload.user;
            state.isSuccess = true;
            state.isAdmin = false;         
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = 'finish';
            state.isAuthenticated = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = 'finish';
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = 'finish';
            state.isAuthenticated = false;
            state.error = action.payload.message;
        })

        .addCase(loginAdmin.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = 'finish';     
            state.isSuccess = true;      
            state.isAdmin = action.payload.isAdmin;
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.loading = 'finish';
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = 'finish';
            state.users = action.payload.users;            
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = 'finish';
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it


// export actions
export const { clearError } = userSlice.actions;

// export reducer
export default userSlice.reducer;
