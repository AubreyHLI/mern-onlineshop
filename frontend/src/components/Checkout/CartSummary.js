import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllCartItems } from '../../redux/features/shoppingcartSlice';
import { BACKEND_URL } from '../../static/server';


const CartSummary = ({subTotalPrice, shipping, discount, totalPrice}) => {
    const cartItems = useSelector(selectAllCartItems);

    return (
    <>
        <div>
            {cartItems && cartItems.map((item, index) => {
            const itemPrice = item.product.price;
            return (
            <div className="border-b" key={index}>
                <div className="w-full flex items-center">
                    <img src={`${BACKEND_URL}${item.product.image}`} alt="" className="w-[30px] mr-2 rounded-[5px]"/>
                    <div className="px-[5px] w-[calc(100%-30px)]">
                        <div className='flex justify-between w-full'>
                            <h1 className='text-[13px] 800px:text-[11px]'>{item.product.name}</h1>
                        </div>
                        <div className='flex justify-between pt-[4px] font-[400] text-[14px] text-[#00000082]'>
                            <h4>${itemPrice} * {item.qty}</h4>
                            <h4>${(itemPrice * item.qty).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </div>
            )
            })}
        </div>
        <div className='flex flex-col gap-2 mt-2'>
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
                <h5 className="text-[18px] font-[600]">${subTotalPrice?.toFixed(2)}</h5>
            </div>
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
                <h5 className="text-[18px] font-[600]">${shipping?.toFixed(2)}</h5>
            </div>
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">
                    {discount ? `- $${discount?.toString()}` : '-'}
                </h5>
            </div>

            <div className="flex justify-between pt-1">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Order total:</h3>
                <h5 className="text-[18px] font-[600]">${totalPrice}</h5>
            </div>
        </div>
    </>
  )
}

export default CartSummary