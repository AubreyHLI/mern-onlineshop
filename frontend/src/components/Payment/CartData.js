import React from 'react'

const CartData = ({ orderData }) => {
    const shipping = orderData?.shipping?.toFixed(2);

    return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
            <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
            <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
            <h5 className="text-[18px] font-[600]">{orderData?.discountTotal? "- $" + orderData.discountTotal : "-"}</h5>
        </div>
        <div className="flex justify-between pt-3">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">Order total:</h3>
            <h5 className="text-[18px] font-[600]">${orderData?.totalPrice}</h5>
        </div>
     </div>
    );
};

export default CartData