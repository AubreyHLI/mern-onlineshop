import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../redux/features/shoppingcartSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/animations/89618-gopay-succesfull-payment.json";


const OrderSuccessPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems());
        window.scrollTo(0, 0);
    }, []);

    return (
    <div className="w-[80%] h-full flex flex-col items-center justify-center mx-auto mb-12">
        <Player
            autoplay
            // loop={true}
            loop={false}
            keepLastFrame={true}
            src={animationData}
            style={{ height: '300px', width: '300px' }}
            >
        </Player>
        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
            Payment successful :)
        </h5>
    </div>
    )
};

export default OrderSuccessPage;