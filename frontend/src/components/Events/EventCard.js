import React from "react";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../static/server";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EventCard = ({ eventData }) => {
    const addToCartHandler = (data) => {
        // const isItemExists = cart && cart.find((i) => i._id === data._id);
        // if (isItemExists) {
        //   toast.error("Item already in cart!");
        // } else {
        //   if (data.stock < 1) {
        //     toast.error("Product stock limited!");
        //   } else {
        //     const cartData = { ...data, qty: 1 };
        //     dispatch(addTocart(cartData));
        //     toast.success("Item added to cart successfully!");
        //   }
        // }
    }

    return (
        <div className={`w-full flex bg-white rounded-lg my-4 flex-col 800px:flex-row p-4 800px:px-10 800px:py-6`}>
            <div className="w-[80%] max-w-[360px] 800px:w-[50%] m-auto 800px:pr-20">
                <img src={`${BACKEND_URL}${eventData.product.images[0]}`} alt="" />
            </div>
            <div className="w-full lg:[w-45%] flex flex-col justify-between">
                <h2 className='productTitle'>{eventData.product.name}</h2>
                <div className="normalFlex py-2 justify-between">
                    <div className="normalFlex">
                        <h5 className="font-[500] text-[20px] text-[#d55b45] pr-3 line-through">
                            {eventData.product.originalPrice}$
                        </h5>
                        <h5 className="font-bold text-[24px] text-[#333] font-Roboto">
                            {eventData.discountPrice}$
                        </h5>
                    </div>
                    <span className="pr-3 lg:pr-10 font-[400] text-[17px] text-[#44a55e]">
                        {eventData.product.sold_out} sold
                    </span>
                </div>
                <p>{eventData.description}</p>
                <div className="my-6">
                    <CountDown data={eventData}/>
                </div>
                <div className="flex items-center">
                    <Link to={`/product/${eventData.productId}?isEvent=true`}>
                        <div className='button2'>See Details</div>
                    </Link>
                    <div className='button2 ml-5 !bg-[black] !text-[white]' onClick={() => addToCartHandler(eventData)}>
                        <span className="flex items-center">
                            Add to cart <AiOutlineShoppingCart size={20} className="ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;