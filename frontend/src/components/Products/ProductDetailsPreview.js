import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../static/server";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/shoppingcartSlice";
import { addProductToWishlist, selectAllWishItems } from "../../redux/features/wishlistSlice";


const ProductDetailsPreview = ({ setOpen, data }) => {
	const [count, setCount] = useState(1);
	const [click, setClick] = useState(false);

	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
   	const wishlist = useSelector(selectAllWishItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i.productId === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

	const incrementCount = () => {
		if(count < data.stock) {
			setCount(count + 1);
		}
	};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const addToCartHandler = () => {
        if(isAuthenticated) {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                dispatch(addProductToCart({
                    product: {
                        _id: data._id,
                        name: data.name,
                        image: data.images[0],
                        stock: data.stock,
                        originalPrice: data.originalPrice,
                        discountPrice: data.discountPrice,
                    },
                    qty: count,
                    repeat: true,
                }))
                .then(resp => toast.success(resp.payload.message, {autoClose: 1500}));
            }
        } else {
            navigate('/login');
        }
    };

	const addToWishlistHandler = (data) => {
        if(isAuthenticated) {
            setClick(!click);
            dispatch(addProductToWishlist({
                productId: data._id,
                product: {
                    _id: data._id,
                    name: data.name,
                    image: data.images[0],
                    stock: data.stock,
                    originalPrice: data.originalPrice,
                    discountPrice: data.discountPrice,
                }
            }));
        } else {
            navigate('/login');
        }
    };

	

	return (
		<div className="bg-[#fff]">
			{ data && 
			<div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
				<div className="w-[90%] 1100px:w-[80%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-8 pt-5">
					<RxCross1 size={30} className="absolute right-3 top-3 z-50" onClick={() => setOpen(false)} />

					<div className="block w-full 800px:flex">
						<div className="w-full 800px:w-[40%]">
							<img src={`${BACKEND_URL}${data?.images[0]}`} alt='' className="max-w-[400px] w-full py-4 m-auto "/>
							<div className="flex">
								<Link to={`/brand/${data?.brand?._id}`} className="flex">
									<img src={`${BACKEND_URL}${data?.brand?.avatar}`} alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
									<div>
										<h3 className='shop_name'>{data?.brand?.name}</h3>
									</div>
								</Link>
							</div>
						</div>

						<div className="w-full 800px:flex-1 pl-[5px] pr-[5px]">
							<h1 className='productTitle py-3'>
								{data.name}
							</h1>
							<p>{data.description}</p>

							<div className="normalFlex pt-3">
								<h4 className='productDiscountPrice'>
									{data.discountPrice}$
								</h4>
								<h3 className='price'>
									{data.originalPrice ? data.originalPrice + "$" : null}
								</h3>
							</div>

							<div className="flex items-center mt-6 justify-between pr-3">
								<div>
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
								<div>
									{click 
									? <AiFillHeart
										size={30}
										className="cursor-pointer"
										onClick={() => addToWishlistHandler(data)}
										color="#78be20"
										title="Remove from wishlist"
									/>
									: <AiOutlineHeart
										size={30}
										className="cursor-pointer"
										onClick={() => addToWishlistHandler(data)}
										color="#333"
										title="Add to wishlist"
									/>
									}
								</div>
							</div>

							<div className="normalFlex justify-between mt-5 800px:mr-3">
								<div className='button rounded-[4px] h-11 flex items-center !w-[120px] 400px:!w-[200px]' onClick={() => addToCartHandler()}>
									<span className="flex items-center">
										Add to cart <AiOutlineShoppingCart size={20} className="ml-1" />
									</span>
								</div>
								<h5 className="text-[16px] text-[#68d284]">{data.sold_out} Sold out</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default ProductDetailsPreview;