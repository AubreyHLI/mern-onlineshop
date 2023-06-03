import React, { useState } from 'react';
import { BsCartPlus } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";


const WishlistItem = ({ data, removeFromWishlist, addToCart }) => {

    return (
        <div className="border-b py-4 pl-2 pr-5">
            <div className="w-full flex items-center">
                <img src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt="" className="w-[50px] h-min ml-2 mr-2 rounded-[5px]"/>
                <div className="pl-[5px]">
                    <div className='flex justify-between'>
                        <h1 className='text-[15px] leading-'>{data.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={() => removeFromWishlist(data)} />
                        </span>
                    </div>
                    <div className='normalFlex pt-[8px] justify-between'>
                        <h4 className="font-[600] text-[#d02222]">
                            US${data.price}
                        </h4>
                        <button className='normalFlex gap-x-2 py-1 px-3 rounded-full bg-lime-400 text-sm' onClick={() => addToCart(data)}>
                            <BsCartPlus size={20} className="cursor-pointer"/>
                            Add to Cart
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default WishlistItem