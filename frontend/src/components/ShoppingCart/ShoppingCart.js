import React, { useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateProductInCart, deleteProductInCart, selectAllCartItems, getLoadingItems } from '../../redux/features/shoppingcartSlice';


const ShoppingCart = ({setOpenCart}) => {
    const cartItems = useSelector(selectAllCartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [])

    const handleChangeQty = (data) => {
        dispatch(updateProductInCart(data));
    }

    const handleRemoveItem = (itemId) => {
        dispatch(deleteProductInCart(itemId));
    }

    return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
        <div className="fixed top-0 right-0 h-full w-[90%] 500px:w-[350px] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
            <div className="w-full h-full">
                <div className="normalFlex w-full h-[80px] justify-between px-5 sticky top-0 bg-white">
                    {/* Item length */}
                    <div className='normalFlex'>
                        <IoBagHandleOutline size={24} />
                        <h5 className="pl-2 text-[20px] font-[500]">{cartItems?.length} {cartItems?.length > 1 ? 'items' : 'item'}</h5>
                    </div>
                    <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
                </div>
                { cartItems?.length === 0 
                ? <div className='cart_content flex items-center justify-center'>
                    <h5>Shopping Cart is empty!</h5>
                </div>
                : <>
                    <div className='cart_content'>
                        {/* cart Single Items */}
                        <div className="w-full border-t">
                            {cartItems && cartItems?.map((item, index) => (
                                <CartItem 
                                    key={index} 
                                    data={item}
                                    quantityChange={handleChangeQty}
                                    removeFromCart={handleRemoveItem}
                                />
                            ))}
                        </div>
                    </div>
                    {/* checkout buttons */}
                    <div className="px-5 mb-3 h-[50px] sticky bottom-0 bg-white">
                        <Link to="/checkout">
                            <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                                <h1 className="text-[#fff] text-[18px] font-[600]">
                                    Checkout Now (RMB $1000)
                                </h1>
                            </div>
                        </Link>
                    </div>
                </>
                }
            </div>
        </div>
    </div>
    )
}

export default ShoppingCart