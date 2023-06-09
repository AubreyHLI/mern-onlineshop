import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../static/server";
import PaymentInfo from "./PaymentInfo";
import CartSummary from "../Checkout/CartSummary";
import { createOrder } from "../../redux/features/orderSlice";
import { clearSuccess, clearError } from "../../redux/features/orderSlice";


const PaymentContent = () => {
    const [orderData, setOrderData] = useState([]);

    const user = useSelector(state => state.user.user);
    const {error, isError, success, isSuccess} = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const savedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(savedOrderData);
    }, []);

    useEffect(() => {
        if(isSuccess) {
            toast.success("Order successful!");
            dispatch(clearSuccess());
            localStorage.setItem("latestOrder", JSON.stringify([]));
            navigate("/checkout/orderSuccess");
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }

    }, [isError, isSuccess]);

    const orderItems = orderData?.cartItems?.map(item => {
        return {
            ...item,
            isReviewed: false
        }
    })

    const order = {
        cart: orderItems,
        shippingAddress: orderData?.shippingAddress,
        user: {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
        },
        priceSummary: {
            subTotalPrice: orderData?.subTotalPrice,
            shipping: orderData?.shipping,
            discount: orderData?.discountTotal,
            totalPrice: orderData?.totalPrice,
        },
    };

    
    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),  // if charge $1 you must set amount=100 as stripe uses cents, $1 = 100cents
    };
    

    const handlePayByCard = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        try {
            const response = await axios.post(`${SERVER_URL}/payment/process`,
                paymentData,
                {
                    headers: {"Content-Type": "application/json",},
                    withCredentials: true,
                }
            );
            const result = await stripe.confirmCardPayment(response.data.client_secret, 
                { 
                    payment_method: { card: elements.getElement(CardNumberElement) } 
                }
            );
            if (result.error) {
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        type: "Debit/Credit Card",
                    };
                    dispatch(createOrder(order));
                }
            }
        } catch (error) {
            toast.error(error);
        }
    };


    const handlePayInCash = async (e) => {
        e.preventDefault();
        order.paymentInfo = {
            type: "Cash On Delivery",
        };
        dispatch(createOrder(order));
    };

    return (
    <div className="w-full flex flex-col items-center py-8 mb-4">
        <div className="w-[90%] max-w-[1200px] block 800px:flex">
            <div className="w-full 800px:w-[65%] 1000px:w-[80%]">
                <PaymentInfo
                    user={user}
                    handlePayByCard={handlePayByCard}
                    handlePayInCash={handlePayInCash}
                />
            </div>

            <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                <div className="w-full bg-[#fff] rounded-md flex flex-col gap-1 px-5 py-4">
                     <CartSummary 
                        subTotalPrice={orderData?.subTotalPrice}
                        shipping={orderData?.shipping}  
                        discount={orderData?.discountTotal}
                        totalPrice={orderData?.totalPrice}
                     />                                       
                 </div>
             </div>
         </div>
     </div>
    );
};

export default PaymentContent;