import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./userReducer";
import userReducer from "./features/userSlice";
import productsReducer from "./features/productsSlice";
import brandsReducer from "./features/brandsSlice";
import eventsReducer from "./features/eventsSlice";
import cartReducer from "./features/shoppingcartSlice";
import wishlistReducer from "./features/wishlistSlice";
import couponsReducer from "./features/couponSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        brands: brandsReducer,
        events: eventsReducer,
        shoppingCart: cartReducer,
        wishlist: wishlistReducer,
        coupons: couponsReducer,
    }
})

export default store;