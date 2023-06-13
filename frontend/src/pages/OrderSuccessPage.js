import React, { useEffect } from "react";
import Header from "../components/Layout/Header/Header2";
import Footer from "../components/Layout/Footer";
import OrderSuccessful from "../components/Orders/OrderSuccessful";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../redux/features/shoppingcartSlice";


const OrderSuccessPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchCartItems());
    }, []);

    return (
        <div>
            <Header />
            <OrderSuccessful />
            <Footer />
        </div>
    );
};

export default OrderSuccessPage;