import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { BACKEND_URL } from '../../static/server';


const CartItem = ({ data, quantityChange, removeFromCart }) => {
    const [value, setValue] = useState(data.qty);
    const productItem = data.product;
    const totalPrice = productItem.discountPrice * value;
    
    const increment = () => {
        if (value < productItem.stock) {
            setValue(value + 1);
            const updateCartData = { itemId: data._id, qty: value + 1 };
            quantityChange(updateCartData);
        } else {
            toast.error("Product stock limited!");
        }
    };
  
    const decrement = () => {
        if (value > 1) {
            setValue(value - 1);
            const updateCartData = { itemId: data._id, qty: value - 1 };
            quantityChange(updateCartData);
        }         
    };
  
    return (
        <div className="border-b py-4 pl-2 pr-5">
            <div className="w-full flex items-center">
                <img src={`${BACKEND_URL}${productItem.image}`} alt="" className="w-[50px] ml-2 mr-2 rounded-[5px]"/>
                <div className="pl-[5px] w-[calc(100%-50px)]">
                    <div className='flex justify-between w-full'>
                        <h1 className='text-[15px]'>{productItem.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={() => removeFromCart(data._id)} />
                        </span>
                    </div>
                    <div className='flex justify-between pt-[4px]'>
                        <h4 className="font-[400] text-[14px] text-[#00000082]">
                            ${productItem.discountPrice} * {value}
                        </h4>
                        <div className='normalFlex w-[70px] justify-between'>
                            <button  onClick={() => decrement()} className={`${value < 2 ? 'bg-[#a7abb14f] text-[#7d879c]': 'bg-[#34b351] text-[#fff]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiOutlineMinus size={13} />
                            </button>
                            <span className="text-[15px]">{value}</span>
                            <button onClick={() => increment()} className={`${value < productItem.stock ? 'bg-[#34b351] text-[#fff]' : 'bg-[#a7abb14f] text-[#7d879c]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiPlus size={13} />
                            </button>
                        </div>
                    </div>
                    <h4 className="font-[600] text-[#d02222]">
                        ${totalPrice}
                    </h4>
                </div>
                
            </div>
        </div>
    );
}

export default CartItem
