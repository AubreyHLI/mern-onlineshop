import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { createNewReview, clearSuccess, clearError } from '../../redux/features/productsSlice'
import { toast } from 'react-toastify'
import { fetchUserOrders } from '../../redux/features/orderSlice'

const NewReviewForm = ({orderId, open, setOpen, selectedItem }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const user = useSelector(state => state.user.user);
    const {isSuccess, success, isError, error} = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            toast.success(success);
            dispatch(clearSuccess());
            dispatch(fetchUserOrders());
            setOpen(false);
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isSuccess, isError])

    const handleAddReview = () => {
        dispatch(createNewReview({
            user: {
                _id: user._id,
                name: user.name,
                emial: user.email
            },
            rating,
            comment,
            productId: selectedItem?.productId,
            orderId,
        }));
    }

    return (
    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
        <div className="w-full max-w-[700px] h-[85vh] bg-white rounded shadow relative overflow-y-scroll p-4 px-8">
            <div className="w-full flex justify-end px-3 pb-0">
                <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-center text-[25px] font-[500] font-Poppins">
                Give a Review
            </h1>

            <div className="w-full mt-4">
                <h5 className="text-[20px] font-[500]">
                    Product
                </h5>
                <div className="w-full flex mt-2">
                    <img src={selectedItem?.product?.image} alt="" className="w-[80px] h-[80px]" />
                    <div className='pl-3'>
                        <div className="text-[18px]">{selectedItem?.product?.name}</div>
                        <h4 className="pt-3 text-[#00000091]">US${selectedItem?.product?.price} x {selectedItem?.qty}</h4>
                    </div>
                </div>

                <h5 className="text-[20px] font-[500] mt-4">
                    Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full pt-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i 
                    ? <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
                    : <AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)}/>
                    )}
                </div>

                <label className="block text-[20px] font-[500] mt-5" htmlFor='commet'>
                    Write a Comment
                    <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
                </label>
                <textarea name="comment" id="comment" cols="20" rows="5" value={comment} placeholder="How was your product? write your expresion about it!"
                    onChange={(e) => setComment(e.target.value)} className="mt-2 w-[95%] border p-2 outline-none resize-none" >
                </textarea>

                <div className='flex justify-center mt-5'>
                    <button onClick={handleAddReview} className='button'>
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default NewReviewForm