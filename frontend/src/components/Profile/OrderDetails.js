import React, { useEffect, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs';
import NewReviewForm from './NewReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { requestRefund, clearSuccess, clearError } from '../../redux/features/orderSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({data}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {isSuccess, success, isError, error} = useSelector(state => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess) {
            toast.success(success);
            dispatch(clearSuccess());
            if(data.status === "Processing Refund") {
                navigate('./profile/orders')
            }
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isSuccess, isError])

    
    const handleRefund = () => {
        dispatch(requestRefund(data._id))
    }

    return (
    <div className='section max-w-[1200px] py-8 mb-4'>
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
                <BsBagCheck size={25} />
                <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
        </div>      
        <div className="w-full 800px:flex items-start">
            <div className="w-full 800px:w-[60%]">
                <h4 className="pt-3 font-[600] text-[20px]">Shipping Address:</h4>
                <h4 className="pt-3">{data?.shippingAddress.address1}, {data?.shippingAddress.address2}</h4>
                <h4>{data?.shippingAddress.city}, {data?.shippingAddress.state}, {data?.shippingAddress.country}</h4>
                <h4 className="pt-3">{data?.shippingAddress.name}</h4>
                <h4 className="pt-3">{data?.shippingAddress.phoneNumber}</h4>
            </div>
            <div className="w-full 800px:w-[40%]">
                <h4 className="pt-3 font-[600] text-[20px]">Payment Info:</h4>
                <h4 className="pt-3">Method: {data?.paymentInfo.type}</h4>
                <h4 className="pt-3">Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                { data?.status === "Delivered" &&
                <button onClick={handleRefund} className="button3 !mt-6 !bg-[green] !text-[white]">
                    Request a Refund
                </button>}
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
                <div className="w-full flex flex-col justify-between 800px:flex-row">
                    <div>
                        <h5 className="pl-3 text-[18px]">{item.product.name}</h5>
                        <h5 className="pl-3 text-[16px] text-[#00000091]">
                            US${item.product.price} x {item.qty}
                        </h5>
                    </div>
                    <div className='w-full 800px:w-[200px]'>
                        <button onClick={() => setOpen(true) || setSelectedItem(item)} disabled={item.isReviewed || data?.status !== "Delivered"} className="button3 ml-[auto] mr-0 w-[150px] !h-10 !mt-0">
                            Write a review
                        </button>
                    </div>
                </div> 
            </div>)}
        </div>
    
        <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
                Subtotal: <strong>US${data?.priceSummary.subTotalPrice.toFixed(2)}</strong>
            </h5>
            <h5 className="pt-3 text-[18px]">
                Shipping: <strong>US${data?.priceSummary.shipping.toFixed(2)}</strong>
            </h5>
            {data?.priceSummary.discount && 
            <h5 className="pt-3 text-[18px]">
                Discount: <strong> - US${data?.priceSummary.discount.toFixed(2)}</strong>
            </h5>}
            <h5 className="pt-3 text-[18px]">
                Total Price: <strong>US${data?.priceSummary.totalPrice.toFixed(2)}</strong>
            </h5>
        </div>
        
        {open && 
        <NewReviewForm orderId={data._id} setOpen={setOpen} selectedItem={selectedItem} />
        }
    </div>
    );
}

export default OrderDetails