import React from "react";
import Header from "../components/Layout/Header/Header2";
import Footer from "../components/Layout/Footer";
import animationData from "../assets/animations/89618-gopay-succesfull-payment.json";
import { Player}  from '@lottiefiles/react-lottie-player';
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const OrderSuccessPage = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            <Header />
            <CheckoutSteps active={3} />
            <div className="w-[80%] h-full flex flex-col items-center justify-center mx-auto mb-12">
                <Player
                    autoplay
                    loop={true}
                    src={animationData}
                    style={{ height: '300px', width: '300px' }}
                    >
                </Player>
                <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                    Your order is successful :)
                </h5>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccessPage;