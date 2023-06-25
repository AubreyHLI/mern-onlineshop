import React from "react";
import animationData from "../../assets/animations/53735-cart-icon-loader.json";
import { Player}  from '@lottiefiles/react-lottie-player';

const Loader = () => {
  return (
    <div className="w-[80%] h-[60vh] flex items-center justify-center mx-auto">
        <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '300px', width: '300px' }}
            >
        </Player>
    </div>

  );
};

export default Loader;