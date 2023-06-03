import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import WishlistItem from './WishlistItem';

const wishlistData = [
    {
        name: "Iphone 14 pro max 256gb ssd and 8gb ram sliver color",
        description: "test",
        price: 888
    },
    {
        name: "Iphone 14 pro max 256gb ssd and 8gb ram sliver color",
        description: "test",
        price: 888
    },
];


const Wishlist = ({setOpenWishlist}) => {

    const handleRemoveItem = () => {

    }

    const handleAddToCart = () => {

    }

    return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
        <div className="fixed top-0 right-0 h-full w-[90%] 500px:w-[350px] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
            <div className="w-full h-full">
                <div className="normalFlex w-full h-[80px] justify-between px-5 bg-white">
                    {/* Item length */}
                    <div className='normalFlex'>
                        <IoBagHandleOutline size={24} />
                        <h5 className="pl-2 text-[20px] font-[500]">{wishlistData && wishlistData?.length} {wishlistData?.length > 1 ? 'items' : 'item' }</h5>
                    </div>
                    <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenWishlist(false)} />
                </div>
                { wishlistData && wishlistData.length === 0 
                ? <div className='widhlist_content flex items-center justify-center'>
                    <h5>Wishlist is empty!</h5>
                </div>
                : <div className='wishlist_content'>
                    {/* cart Single Items */}
                    <div className="w-full border-t">
                        {wishlistData && wishlistData.map((item, index) => (
                            <WishlistItem key={index} data={item}
                                removeFromWishlist={handleRemoveItem}
                                addToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
                }
            </div>

           
        </div>
    </div>
    )
}

export default Wishlist