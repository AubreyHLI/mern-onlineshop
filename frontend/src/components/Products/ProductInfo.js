import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import { BACKEND_URL } from '../../static/server';


const ProductInfo = ({data}) => {
    const [active, setActive] = useState(1);

    return (
    <div className="bg-[#fff] px-3 800px:px-10 py-2 rounded">
        <div className="w-full flex justify-between border-b pt-10 pb-2">
            <div className="relative">
                <h5 onClick={() => setActive(1)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                    Product Details
                </h5>
                { active === 1 ? <div className='active_indicator' /> : null }
            </div>
            <div className="relative">
                <h5 onClick={() => setActive(2)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                    Product Reviews
                </h5>
                { active === 2 ? <div className='active_indicator' /> : null }
            </div>
            <div className="relative">
                <h5 onClick={() => setActive(3)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                    Seller Information
                </h5>
                { active === 3 ? <div className='active_indicator' /> : null }
            </div>
        </div>

        {active === 1 ? (
        <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                { data.description }
            </p>
        </>
        ) : null}

        {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            { data && data.reviews.map((item, index) => (
                <div className="w-full flex my-2" key={index}>
                    <CgProfile size={50} color="#fcfcfc" />
                    <div className="pl-2 ">
                        <div className="w-full flex items-center">
                            <h1 className="font-[500] mr-3">{item.user.name}</h1>
                            <Ratings ratings={data?.ratings} />
                        </div>
                        <p>{item.comment}</p>
                    </div>
                </div>
            ))}

            <div className="w-full flex justify-center">
                {data && data.reviews.length === 0 && (
                    <h5>No Reviews have for this product!</h5>
                )}
            </div>
        </div>
        ) : null}

        {active === 3 && (
        <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
                <Link to={`/brand/${data.brand._id}`}>
                    <div className="flex items-center">
                        <img src={`${BACKEND_URL}${data?.brand?.avatar}`} alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
                        <div className="pr-8">
                            <h3 className='shop_name'>{data?.brand?.name}</h3>
                        </div>
                    </div>
                </Link>
                <p className="pt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus id voluptas et nisi! Minus aliquid officia voluptatem quo autem odit quae dolore, quam magnam quod porro, ipsam, itaque accusamus eaque?
                </p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                <div className="text-left">
                    <h5 className="font-[600]">
                        Joined on:{" "}
                        <span className="font-[500]">
                            {/* {data.shop?.createdAt?.slice(0, 10)} */}
                            1 May, 2020
                        </span>
                    </h5>
                    <h5 className="font-[600] pt-3">
                        Total Products:{" "}
                        <span className="font-[500]">
                            {/* {products && products.length} */}
                            100
                        </span>
                    </h5>
                    <h5 className="font-[600] pt-3">
                        Total Reviews:{" "}
                        {/* <span className="font-[500]">{totalReviewsLength}</span> */}
                        30
                    </h5>
                    <Link to="/">
                        <div className='button !rounded-[4px] !h-[39.5px] mt-3' >
                            <h4 className="text-white">Visit Shop</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        )}
    </div>
    );
}

export default ProductInfo