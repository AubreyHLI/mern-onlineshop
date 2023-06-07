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


// Profile
export const updateUserInfo = createAsyncThunk('user/updateUserInfo', async (userInfo, {rejectWithValue}) => {
    try{
        const response = await axios.patch(`${SERVER_URL}/users/updateInfo`, userInfo, { withCredentials: true });     
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const updateUserAddresses = createAsyncThunk('user/updateAddresses', async (userInfo, {rejectWithValue}) => {
    try{
        const response = await axios.patch(`${SERVER_URL}/users/updateAddresses`, userInfo, { withCredentials: true });     
        return response.data;
    } catch(err) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

export const deleteUserAddress = createAsyncThunk('user/deleteAddress', async (id, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/users/deleteAddress/${id}`, { withCredentials: true });     
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


// Admin
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
        loading: true,
        isAdmin: false,
        isSuccess: false,
        isError: false
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
        .addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;            
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.isSuccess = true;
            state.isAdmin = false;         
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.isError = true;
            state.error = action.payload.message;
        })

       
        .addCase(updateUserInfo.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.user = action.payload.user;
        })
        .addCase(updateUserInfo.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(updateUserAddresses.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.user = action.payload.user;
        })
        .addCase(updateUserAddresses.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(deleteUserAddress.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.user = action.payload.user;
        })
        .addCase(deleteUserAddress.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.message;
        })

        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        })


        .addCase(loginAdmin.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;     
            state.isSuccess = true;      
            state.isAdmin = action.payload.isAdmin;
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload.message;
        })
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.users;            
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});


// create selectors and export it because the component will use it


// export actions
export const { clearError, clearSuccess } = userSlice.actions;

// export reducer
export default userSlice.reducer;
