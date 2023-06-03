import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../../static/server'
import logo from '../../assets/logo.png'
import { RiAdminLine } from 'react-icons/ri'

const AdminHeader = () => {
    const {user} = useSelector((state) => state.user);

    return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <Link to="/">
            <div className='logo h-full'>
                <img src={logo} alt='logo' className='h-full'/>
            </div>
        </Link>
        
        <div className="flex items-center">
            <div className="flex items-center mr-4">
                <Link to="/dashboard/cupouns" className="800px:block hidden">
                    <AiOutlineGift color="#555" size={30} className="mx-5 cursor-pointer" />
                </Link>
                <Link to="/dashboard-events" className="800px:block hidden">
                    <MdOutlineLocalOffer color="#555" size={30} className="mx-5 cursor-pointer" />
                </Link>
                <Link to="/dashboard-products" className="800px:block hidden">
                    <FiShoppingBag color="#555" size={30} className="mx-5 cursor-pointer" />
                </Link>
                <Link to="/dashboard-orders" className="800px:block hidden">
                    <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
                </Link>
                <Link to="/dashboard-messages" className="800px:block hidden">
                    <BiMessageSquareDetail color="#555" size={30} className="mx-5 cursor-pointer" />
                </Link>
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