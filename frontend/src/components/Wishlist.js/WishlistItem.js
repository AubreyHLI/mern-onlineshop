import React from 'react';
import { BsCartPlus } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";


const WishlistItem = ({ data, removeFromWishlist, addToCart }) => {
    const productData = data.product;
    const productPrice = productData.price;

    return (
        <div className="border-b py-4 pl-2 pr-5">
            <div className="w-full flex items-center">
                <img src={productData.image} alt="" className="w-[50px] h-min ml-2 mr-2 rounded-[5px]"/>
                <div className="pl-[5px] w-full">
                    <div className='flex justify-between w-full'>
                        <h1 className='text-[15px] leading-'>{productData.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={() => removeFromWishlist(data._id)} />
                        </span>
                    </div>
                    <div className='normalFlex pt-[8px] justify-between'>
                        <h4 className="font-[600] text-[#d02222]">
                            US${productPrice}
                        </h4>
                        <button className='normalFlex gap-x-2 py-1 px-3 rounded-full bg-lime-400 text-sm' onClick={() => addToCart(productData)}>
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