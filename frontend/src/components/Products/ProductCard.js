import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../static/server';
import ProductDetailsPreview from "./ProductDetailsPreview";
import Ratings from "./Ratings";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, clearError, clearSuccess } from "../../redux/features/shoppingcartSlice";
import { addProductToWishlist, selectAllWishItems } from "../../redux/features/wishlistSlice";


const ProductCard = ({ data, isBrandPage }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    
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


    const addToWishlistHandler = (data) => {
        if(isAuthenticated) {
            setClick(!click);
            dispatch(addProductToWishlist({
                productId: data._id,
                product: {
                    _id: data._id,
                    name: data.name,
                    image: data.images[0],
                    brandId: data.brandId,
                    stock: data.stock,
                    originalPrice: data.originalPrice,
                    discountPrice: data.discountPrice,
                }
            }))
            .then(resp => toast(resp.payload.message, {autoClose: 2000}));
        
        } else {
            navigate('/login');
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
                        brandId: data.brandId,
                        stock: data.stock,
                        originalPrice: data.originalPrice,
                        discountPrice: data.discountPrice,
                    },
                    qty: 1,
                    repeat: false,
                }))
                .then(resp => toast(resp.payload.message, {autoClose: 2000}));
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
                <Link to={`/product/${data._id}`}>
                    <img className="w-full h-[170px] px-5 object-contain" alt="" src={`${BACKEND_URL}${data.images && data.images[0]}`}/>
                </Link>
                { !isBrandPage && 
                <Link to={`/brand/${data.brand._id}`}>
                    <h5 className='shop_name'>{data.brand.name}</h5>
                </Link>
                }
                <Link to={`/product/${data._id}`}>
                    <h4 className="pb-3 font-[500] h-[60px]">
                        { data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name }
                    </h4>

                    <div className="normalFlex">
                        <Ratings ratings={data?.ratings} />
                        <span className="pl-4 pb-1">{`(${data?.reviews.length})`}</span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="normalFlex">
                            <h5 className='productDiscountPriceSm'>
                                { data.originalPrice === 0 ? data.originalPrice : data.discountPrice }
                                $
                            </h5>
                            <h4 className='priceSm'>
                                { data.originalPrice ? data.originalPrice + " $" : null }
                            </h4>
                        </div>
                        <span className="font-[400] text-[17px] text-[#68d284]">
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>

                {/* side options */}
                <div>
                    { click 
                    ? <AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5" title="Remove from wishlist"
                        onClick={() => addToWishlistHandler(data)} color="#78be20"
                    />
                    : <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5" title="Add to wishlist"
                        onClick={() => addToWishlistHandler(data)} color="#333" 
                    />
                    }
                    <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14" title="Quick view"
                        onClick={() => setOpen(!open)} color="#333"
                    />
                    <AiOutlineShoppingCart size={22} className="cursor-pointer absolute right-2 top-24" title="Add to cart"
                        onClick={() => addToCartHandler()} color="#444" 
                    />
                    { open 
                    ? <ProductDetailsPreview setOpen={setOpen} data={data} /> 
                    : null}
                </div>
            </div>
        </>
    );
};

export default ProductCard;