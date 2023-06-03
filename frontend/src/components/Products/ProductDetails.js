import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductInfo from './ProductInfo';
import { BACKEND_URL } from '../../static/server';


const ProductDetails = ({data}) => {
    const [count, setCount] = useState(1);
	const [click, setClick] = useState(false);
	const [selectedImgIndex, setSelectedImgIndex] = useState(0);

    const navigate = useNavigate();


	const incrementCount = () => {
		setCount(count + 1);
	};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

    const removeFromWishlistHandler = (data) => {
		setClick(!click);
	};

	const addToWishlistHandler = (data) => {
		setClick(!click);
	};

    const addToCartHandler = (data) => {

    }



  return (
    <div>
        { data &&
        <div className='section p-[16px] pt-2' >
            <div className="w-full py-5">
                <div className="w-full flex flex-col 800px:flex-row">
                    {/* Images */}
                    <div className="w-full 800px:w-[60%] 1000px:w-[600px] 800px:mr-10 flex flex-col 800px:flex-row items-center">
                        {/* preview imgs on bigger screens */}
                        <div className="hidden 800px:flex flex-col w-[20%] gap-4 mr-2 overflow-y-scroll">
                            { data?.images?.map((i, index) => (
                            <div key={index} className={`w-full border ${selectedImgIndex === index ?  "border-slate-300" : "border-transparent"} cursor-pointer`}>
                                <img
                                    src={`${BACKEND_URL}${data?.images[index]}`}  alt=""
                                    className="w-full overflow-hidden"
                                    onClick={() => setSelectedImgIndex(index)}
                                />
                            </div>
                            ))}
                        </div>
                        {/* big img */}
                        <img src={`${BACKEND_URL}${data?.images[selectedImgIndex]}`} alt="" className="w-[80%]"/>
                        {/* preview imgs for mobile*/}
                        <div className="w-full flex justify-center mt-3 gap-3 overflow-x-scroll 800px:hidden">
                            { data?.images?.map((i, index) => (
                            <div key={index} className={`w-[25%] border ${selectedImgIndex === index ?  "border-slate-300" : "border-transparent"} cursor-pointer`}>
                                <img
                                    src={`${BACKEND_URL}${data?.images[index]}`}  alt=""
                                    className="w-full overflow-hidden"
                                    onClick={() => setSelectedImgIndex(index)}
                                />
                            </div>
                            ))}
                        </div>
                    </div>

                     {/* Text */}
                    <div className="w-full 800px:flex-1 mt-5 800px:mt-0 flex flex-col gap-5">
                        <h1 className='productTitle'>{data.name}</h1>
                        <div className='normalFlex justify-between mt-3 max-w-[300px]'>
                            <div className="normalFlex">
                                <h4 className='productDiscountPrice'>
                                    {data.discountPrice}$
                                </h4>
                                <h3 className='price'>
                                    {data.originalPrice ? data.originalPrice + "$" : null}
                                </h3>
                            </div>
                            {/* favorite icon */}
                            <div>
                                {click ? (
                                <AiFillHeart
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={() => removeFromWishlistHandler(data)}
                                    color={click ? "red" : "#333"}
                                    title="Remove from wishlist"
                                />
                                ) : (
                                <AiOutlineHeart
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={() => addToWishlistHandler(data)}
                                    color={click ? "red" : "#333"}
                                    title="Add to wishlist"
                                />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            {/* quantity counter */}
                            <div className='mr-20'>
                                <button onClick={decrementCount} className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">
                                    -
                                </button>
                                <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                    {count}
                                </span>
                                <button onClick={incrementCount} className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">
                                    +
                                </button>
                            </div>
                        </div>
                        {/* add to shopping cart */}
                        <div  onClick={() => addToCartHandler(data._id)} className='button !rounded !h-11 flex items-center'>
                            <span className="flex items-center">
                                Add to cart <AiOutlineShoppingCart size={20} className="ml-1" />
                            </span>
                        </div>

                        
                        <div className="flex items-center">
                            <Link to={`/brand/${data?.brand?._id}`} className="flex">
                                <img src={`${BACKEND_URL}${data?.brand?.avatar}`}  alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
                                <div className="pr-8">
                                    <h3 className='shop_name'>{data?.brand?.name}</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ProductInfo data={data}/>
        </div>
        }
    </div>
  )
}

export default ProductDetails