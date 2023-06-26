import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
import { selectUserAllOrders, selectUserOrdersLoading } from '../../redux/features/orderSlice';

const TrackOrderDetails = ({open, setOpen, id}) => {
    const [order, setOrder] = useState(null);
    const userAllOrders = useSelector(selectUserAllOrders);
    const userOrdersLoading = useSelector(selectUserOrdersLoading);

    useEffect(() => {
        if(!userOrdersLoading) {
            const o = userAllOrders?.find(item => item._id === id);
            setOrder(o);
        }
    }, [userOrdersLoading, id])

    return (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
            <div className="w-full max-w-[700px] h-[85vh] bg-white rounded shadow relative overflow-y-scroll p-4 px-8">
                <div className="w-full flex justify-end px-3 pb-0">
                    <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
                </div>
                <h1 className="text-center text-[25px] font-[500] font-Poppins">
                    Track Order Details
                </h1>
    
                <div className="w-full flex flex-col items-start 500px:flex-row 500px:items-center justify-between my-4">
                    <h5 className="text-[#00000084]">
                        Order ID: <span>#{order?._id?.slice(0, 8)}</span>
                    </h5>
                    <h5 className="text-[#00000084]">
                        Placed on: <span>{order?.createdAt?.slice(0, 10)}</span>
                    </h5>
                </div>

                <div className="w-full mt-2 text-[20px] font-[500]">
                    { order?.status === "Processing" && <h1>Your Order is processing in supermarket.</h1>}
                    { order?.status === "Transferred to delivery partner" && <h1>Your Order is on the way for delivery partner.</h1>}
                    { order?.status === "Shipping" && <h1>Your Order is on the way with our delivery partner.</h1>}
                    { order?.status === "Received" && <h1>Your Order is in your city. Our Delivery man will deliver it.</h1>}
                    { order?.status === "On the way" && <h1>Our Delivery man is going to deliver your order.</h1>}
                    { order?.status === "Delivered" && <h1>Your order is delivered!</h1>}
                    { order?.status === "Processing refund" && <h1>Your refund is processing!</h1>}
                    { order?.status === "Refund Success" && <h1>Your Refund is success!</h1>}
                </div> 
                
            </div>
        </div>)
}

export default TrackOrderDetails