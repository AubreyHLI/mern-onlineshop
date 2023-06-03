import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./userReducer";
import userReducer from "./features/userSlice";
import productsReducer from "./features/productsSlice";
import brandsReducer from "./features/brandsSlice";
import eventsReducer from "./features/eventsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        brands: brandsReducer,
        events: eventsReducer,
    }
})

export default store;