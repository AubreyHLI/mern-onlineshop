import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BACKEND_URL } from '../../static/server';
import ProductDetailsPreview from "./ProductDetailsPreview";
import Ratings from "./Ratings";

const ProductCard = ({ data, isBrandPage }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
//   const product_id = data._id;

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

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
                {click 
                ? <AiFillHeart
                    size={22}
                    className="cursor-pointer absolute right-2 top-5"
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                />
                : <AiOutlineHeart
                    size={22}
                    className="cursor-pointer absolute right-2 top-5"
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Add to wishlist"
                />
                }
                <AiOutlineEye
                    size={22}
                    className="cursor-pointer absolute right-2 top-14"
                    onClick={() => setOpen(!open)}
                    color="#333"
                    title="Quick view"
                />
                <AiOutlineShoppingCart
                    size={22}
                    className="cursor-pointer absolute right-2 top-24"
                    // onClick={() => setOpen(!open)}
                    color="#444"
                    title="Add to cart"
                />
                {open ? <ProductDetailsPreview setOpen={setOpen} data={data} /> : null}
            </div>
        </div>
    </>
  );
};

export default ProductCard;