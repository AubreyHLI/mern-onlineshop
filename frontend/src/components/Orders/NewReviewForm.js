import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

const NewReviewForm = ({open, setOpen, selectedItem, setSelectedItem}) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);

    const reviewHandler = () => {

    }
    return (
    <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
        <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
                <RxCross1 size={30} onClick={() => setOpen(false)} className="cursor-pointer"/>
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
                Give a Review
            </h2>
            <br />
            <div className="w-full flex">
                {/* <img src={`${backend_url}/${selectedItem?.images[0]}`} alt="" className="w-[80px] h-[80px]" /> */}
                <div>
                    <div className="pl-3 text-[20px]">
                        {selectedItem?.name}
                    </div>
                    <h4 className="pl-3 text-[20px]">
                        US${selectedItem?.discountPrice} x {selectedItem?.qty}
                    </h4>
                </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
                Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
            {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                />
                ) : (
                <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                />
                )
            )}
            </div>

            <br />
            <div className="w-full ml-3">
                <label className="block text-[20px] font-[500]">
                    Write a comment
                    <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                    (optional)
                    </span>
                </label>
                <textarea
                    name="comment"
                    id=""
                    cols="20"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? write your expresion about it!"
                    className="mt-2 w-[95%] border p-2 outline-none"
                ></textarea>
            </div>
            <div
            className='button text-white text-[20px] ml-3'
            onClick={rating > 1 ? reviewHandler : null}
            >
            Submit
            </div>
        </div>
    </div>)
}

export default NewReviewForm