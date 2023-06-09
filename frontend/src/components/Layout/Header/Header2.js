import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { BACKEND_URL } from "../../../static/server";
import logo from '../../../assets/logo.png';
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import Wishlist from "../../Wishlist.js/Wishlist";
import { selectAllProducts } from "../../../redux/features/productsSlice";
import { selectAllCartItems } from "../../../redux/features/shoppingcartSlice";
import { selectAllWishItems } from "../../../redux/features/wishlistSlice";


const Header = ({ activeHeading }) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const allProducts = useSelector(selectAllProducts);
    const cartItems = useSelector(selectAllCartItems);
    const wishlist = useSelector(selectAllWishItems);


    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        const filteredProducts = allProducts.filter( p => 
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchData(filteredProducts);
    }


    return (
    <>
    <div className="shadow-md sticky top-0 left-0 z-10 bg-white">
        <div className='section'>
            <div className="h-[80px] py-[20px] flex items-center justify-between">
                {/* menu */}
                <div className="800px:hidden ">
                    <BiMenuAltLeft size={34} onClick={() => setOpenMenu(true)}/>
                </div>

                {/* logo */}
                <Link to='/'>
                    <div className='logo'>
                        <img src={logo} alt='logo' className='h-full'/>
                    </div>
                </Link>

                {/* search box */}
                <div className="w-[45%] relative hidden 800px:block">
                    <input type="text" placeholder="Search Product..." value={searchInput} onChange={handleSearchChange} className="h-[40px] w-full px-3 hover:border-[#4b3dc4] border-[2px] rounded-md" />
                    <AiOutlineSearch size={30} className="absolute right-3 top-1.5 cursor-pointer" />
                    
                    { searchData && searchData.length !== 0 && searchInput
                    ? <div className="absolute min-h-[30vh] w-full bg-slate-50 shadow-sm-2 z-[9] p-4 divide-y divide-slate-200">
                        { searchData && searchData.map((item, index) => 
                        <div className="py-1">
                            <Link to={`/product/${item._id}`}>
                                <div className="w-full flex items-start-py-3">
                                    <img src={`${BACKEND_URL}${item?.images[0]}`} alt="" className="w-[40px] h-[40px] mr-[10px]"/>
                                    <h1>{item.name}</h1>
                                </div>
                            </Link>
                        </div>
                        )}
                      </div>
                    : null }
                </div>

                {/* user info */}
                { isAuthenticated 
                ? <div className="flex gap-[15px]">
                    {/* favorite */}
                    <div className='normalFlex'>
                        <div className="relative cursor-pointer" onClick={() => setOpenWishlist(true)}>
                            <AiOutlineHeart size={30} color="#333333" />
                            <span className="absolute right-0 top-0 rounded-full bg-[#78be20] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {wishlist?.length}
                            </span>
                        </div>
                    </div>
                    {/* shopping cart */}
                    <div className='normalFlex'>
                        <div className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
                            <AiOutlineShoppingCart size={30} color="#333333"/>
                            <span className="absolute right-0 top-0 rounded-full bg-[#78be20] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {cartItems?.length}
                            </span>
                        </div>
                    </div>
                    {/* account */}
                    <div className='hidden 800px:flex 800px:item-center'>
                        <div className="relative flex cursor-pointer">
                            <Link to="/profile">
                                <CgProfile size={30} color="#333333" />
                            </Link>
                        </div>
                    </div>
                </div>
                : <div className="text-[#333333] hidden 800px:flex 800px:item-center">
                    <div className="relative flex normalFlex space-x-2">
                        <CgProfile size={30} color="#333333" />
                        <Link to="/login" className="flex items-center text-[14px] cursor-pointer hover:underline">
                            <span>SIGN IN</span>
                        </Link>
                        <span>|</span>
                        <Link to="/signup" className="flex items-center text-[14px] cursor-pointer hover:underline">
                            <span> REGISTER</span>
                        </Link>
                    </div>
                </div>
                }
            </div>
        </div>
        

        {/* navigation */}
        <div className='transition hidden 800px:flex items-center justify-between w-full h-[50px]'>
            
            <div className='section relative flex justify-between h-full'>

                {/* categories box*/}
                <div onClick={() => setDropDown(!dropDown)} className="relative h-full  w-[210px] hidden 800px:block">
                    <BiMenuAltLeft size={26} className="absolute top-3" />
                    <button className='h-[100%] w-full flex justify-between items-center pl-10 font-sans text-lg font-[500] select-none rounded-t-md text-[#333333]' >
                        All Categories
                    </button>
                    <IoIosArrowDown size={22} onClick={() => setDropDown(!dropDown)} className="absolute right-2 top-4 cursor-pointer" />
                    { dropDown 
                    ? <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
                    : null 
                    }
                </div>
                
                {/* navitems */}
                <div className='normalFlex'>
                    <Navbar activeHeading={activeHeading} />
                </div>

            </div>
        </div>
    </div>

    {/* wishlist details */}
    { openWishlist && <Wishlist setOpenWishlist={setOpenWishlist}/>}

    {/* shopping cart details */}
    { openCart && <ShoppingCart setOpenCart={setOpenCart}/>}



    {/* mobile header menu sidebar */}
    {openMenu && (
    <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 800px:hidden'>
        <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-end flex pr-3">
                <RxCross1 size={28} className="mt-5" onClick={() => setOpenMenu(false)}/>
            </div>

            {/* search box */}
            <div className="w-full relative my-7 px-2 h-[40px]">
                <input type="text" placeholder="Search Product..." value={searchInput} onChange={handleSearchChange} className="h-[40px] w-full px-3 hover:border-[#3957db] border-[2px] duration-300 rounded-md" />
                <AiOutlineSearch size={30} className="absolute right-4 top-1.5 cursor-pointer" />
                
                { searchData && searchData.length !== 0 && searchInput
                ? <div className="absolute h-[100vh] w-full bg-[#fff] shadow-sm-2 z-10 p-4 pr-10 divide-y divide-slate-200">
                    { searchData && searchData.map((item, index) => 
                    <div className="py-1">
                        <Link to={`/product/${item._id}`}>
                            <div className="w-full flex items-start-py-3">
                                <img src={`${BACKEND_URL}${item?.images[0]}`} alt="" className="w-[40px] h-[40px] mr-[10px]"/>
                                <h1>{item.name}</h1>
                            </div>
                        </Link>
                    </div>
                    )}
                    </div>
                : null }
            </div>

            <Navbar activeHeading={activeHeading} />

            <div className="normalFlex w-full m-6">
                {isAuthenticated &&
                <div className="relative cursor-pointer mr-[15px] text-[#000000b7]">
                    <Link to="/profile">
                        <div className="normalFlex gap-3">
                            <CgProfile size={40}/>
                            <h2 className="text-[18px]">Hello {user?.name}</h2>
                        </div>
                    </Link>
                </div>
    
                }

                {!isAuthenticated && 
                <div className="relative normalFlex space-x-2 mr-[15px] ">
                    <CgProfile size={40} color='#000000b7'/>
                    <Link to="/login" className="flex items-center cursor-pointer hover:underline">
                        <span>SIGN IN</span>
                    </Link>
                    <span> | </span>
                    <Link to="/signup" className="flex items-center cursor-pointer hover:underline">
                        <span>REGISTER</span>
                    </Link>
                </div>
                }
            </div>
        </div>
    </div>
    )}
    </>
  );
};

export default Header;