import React, { useEffect, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../static/server";
import { acceptRefund, clearSuccess, clearError, updateStatus } from "../../redux/features/orderSlice";

const AdminOrderDetails = ({data}) => {
    const [status, setStatus] = useState("");
    const {isSuccess, success, isError, error} = useSelector(state => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess) {
            toast.success(success);
            dispatch(clearSuccess());
            navigate('/admin/allOrders');
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isSuccess, isError])


    const handleOrderUpdate = () => {
        dispatch(updateStatus({
            orderId: data._id,
            status: status
        }))
    };


    const handleRefundOrderUpdate = () => {
        dispatch(acceptRefund({
            orderId: data._id,
            status: status
        }))
    }

    const statusOptions = [
        "Processing",
        "Transferred to delivery partner",
        "Shipping",
        "Received",
        "On the way",
        "Delivered",
    ];

    const refundOptions = [
        "Processing refund",
        "Refund Success",
    ];

    return (
    <div>
        <div className='w-full pt-4 pb-12 px-3 500px:pr-8'>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsBagCheck size={25} />
                    <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
            </div>

            <div className="w-full">
                <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
                <div className="w-full">
                    { data?.status !== "Processing refund" && data?.status !== "Refund Success" && 
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
                        { statusOptions.slice(statusOptions.indexOf(data?.status)).map((option, index) => 
                        <option value={option} key={index}> {option} </option> )}
                    </select>
                    }

                    { (data?.status === "Processing refund" || data?.status === "Refund Success") && 
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
                        { refundOptions.slice(refundOptions.indexOf(data?.status)).map((option, index) => 
                        <option value={option} key={index}> {option} </option> )}
                    </select>
                    }

                    <button className="button2 !text-white !bg-pink-400 !h-[35px] !w-[200px]" onClick={data?.status !== "Processing refund" ? handleOrderUpdate : handleRefundOrderUpdate}>
                        Update Order Status
                    </button>
                </div>
            </div>

            <div className="w-full 1000px:flex items-start">
                <div className="w-full 800px:w-[60%]">
                    <h4 className="pt-3 font-[600] text-[20px]">Shipping Address:</h4>
                    <h4 className="pt-3">{data?.shippingAddress.address1}, {data?.shippingAddress.address2}</h4>
                    <h4>{data?.shippingAddress.city}, {data?.shippingAddress.state}, {data?.shippingAddress.country}</h4>
                    <h4 className="pt-3">{data?.shippingAddress.name}</h4>
                    <h4 className="pt-3">{data?.shippingAddress.phoneNumber}</h4>
                </div>
                <div className="w-full 1000px:w-[40%]">
                    <h4 className="pt-3 font-[600] text-[20px]">Payment Info:</h4>
                    <h4 className="pt-3">Method: {data?.paymentInfo.type}</h4>
                    <h4 className="pt-3">Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                </div>
            </div>
        
            <div className="w-full flex flex-col items-start 500px:flex-row 500px:items-center justify-between mt-8">
                <h5 className="text-[#00000084]">
                    Order ID: <span>#{data?._id?.slice(0, 8)}</span>
                </h5>
                <h5 className="text-[#00000084]">
                    Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
                </h5>
            </div>
        
            {/* order items */}
            <div className='mt-6'>
                { data && data?.cart.map((item, index) => 
                <div className='w-full mb-5 flex items-start' key={index}>
                    <img src={item.product.image} alt="" className="w-[90x] h-[90px]" />
                    <div className="w-full flex flex-col justify-between 1000px:flex-row">
                        <h5 className="pl-3 text-[18px] max-w-[70%]">{item.product.name}</h5>
                        <h5 className="pl-3 text-[16px] text-[#00000091]">
                            US${item.product.price} x {item.qty}
                        </h5>
                    </div> 
                </div>)}
            </div>
        
            <div className="border-t w-full text-right">
                <h5 className="pt-3 text-[18px]"> Subtotal: <strong>US${data?.priceSummary.subTotalPrice.toFixed(2)}</strong></h5>
                <h5 className="pt-3 text-[18px]"> Shipping: <strong>US${data?.priceSummary.shipping.toFixed(2)}</strong></h5>
                {data?.priceSummary.discount && 
                <h5 className="pt-3 text-[18px]"> Discount: <strong> - US${data?.priceSummary.discount.toFixed(2)}</strong></h5>}
                <h5 className="pt-3 text-[18px]"> Total Price: <strong>US${data?.priceSummary.totalPrice.toFixed(2)}</strong></h5>
            </div>
        </div>
    </div>
    );
};

export default AdminOrderDetails