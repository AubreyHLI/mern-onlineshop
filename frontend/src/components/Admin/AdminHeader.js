import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiSettings, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../../static/server'
import logo from '../../assets/logo.png'
import { RiAdminLine } from 'react-icons/ri'


const AdminHeader = ({active}) => {
    const {user} = useSelector((state) => state.user);

    return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <Link to="/">
            <div className='logo h-full'>
                <img src={logo} alt='logo' className='h-full'/>
            </div>
        </Link>
        
        <div className="flex items-center">
            <div className="hidden 500px:flex items-center mr-4 gap-5 800px:gap-8 800px:mr-8">
                <div>
                    <Link to="/admin/messages" className={`w-full flex items-center ${active === 10 ? "text-[rgb(132,204,22)]": "text-[#606060]"}`}>
                        <BiMessageSquareDetail size={30} className="cursor-pointer" />
                    </Link>
                </div>
                <div>
                    <Link to="/admin/settings" className={`w-full flex items-center ${active === 11 ? "text-[rgb(132,204,22)]" : "text-[#606060]"}`}>
                        <FiSettings size={26} className="cursor-pointer" />
                    </Link>
                </div>
            </div>
            <span className='normalFlex rounded-full px-4 h-[30px] bg-lime-200'>
                <RiAdminLine />
                Admin
            </span>
        </div>
    </div>
    )
}

export default AdminHeader