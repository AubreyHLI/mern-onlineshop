import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";


const CartItem = ({ data, quantityChange, removeFromCart }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;
  
    const increment = (data) => {
        setValue(value + 1);
        // if (data.stock < value) {
        //     toast.error("Product stock limited!");
        // } else {
        //     setValue(value + 1);
        //     const updateCartData = { ...data, qty: value + 1 };
        //     quantityChange(updateCartData);
        // }
    };
  
    const decrement = (data) => {
      setValue(value === 1 ? 1 : value - 1);
    //   const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    //   quantityChange(updateCartData);
    };
  
    return (
        <div className="border-b py-4 pl-2 pr-5">
            <div className="w-full flex items-center">
                <img src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt="" className="w-[50px] h-min ml-2 mr-2 rounded-[5px]"/>
                <div className="pl-[5px]">
                    <div className='flex justify-between'>
                        <h1 className='text-[15px] leading-'>{data.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={() => removeFromCart(data)} />
                        </span>
                    </div>
                    <div className='flex justify-between pt-[4px]'>
                        <h4 className="font-[400] text-[14px] text-[#00000082]">
                            ${data.price} * {value}
                        </h4>
                        <div className='normalFlex'>
                            <span  onClick={() => decrement(data)}  className="bg-[#a7abb14f] w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
                                <HiOutlineMinus size={13} color="#7d879c" />
                            </span>
                            <span className="px-[8px] text-[15px]">{value}</span>
                            <span onClick={() => increment(data)}  className='bg-[#34b351] border border-[#34b351] w-[20px] h-[20px] normalFlex justify-center cursor-pointer'>
                                <HiPlus size={13} color="#fff" />
                            </span>
                        </div>
                    </div>
                    <h4 className="font-[600] text-[#d02222]">
                        US${totalPrice}
                    </h4>
                </div>
                
            </div>
        </div>
    );
}

export default CartItem
