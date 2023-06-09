import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { TbBrandSlack } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { HiOutlineReceiptRefund, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

const sidebarData = [
    {
        label: 'Dashboard',
        icon: <RxDashboard size={30} />,
        linkUrl: "/admin",
    },
    {
        label: 'All Orders',
        icon: <FiPackage size={30} />,
        linkUrl: "/admin/allOrders",
    },
    {
        label: 'All Brands',
        icon: <TbBrandSlack size={32} className="ml-[-2px]"/>,
        linkUrl: "/admin/allBrands",
    },
    {
        label: 'All Users',
        icon: <HiOutlineUserGroup size={30} />,
        linkUrl: "/admin/allUsers",
    },
    {
        label: 'All Products',
        icon: <FiShoppingBag size={30} />,
        linkUrl: "/admin/allProducts",
    },
    {
        label: 'All Events',
        icon: <MdOutlineLocalOffer size={30} />,
        linkUrl: "/admin/allEvents",
    },
    {
        label: 'Withdraw Request',
        icon:  <BiMoneyWithdraw size={30} />,
        linkUrl: "/admin/withdrawRequest",
    },
    {
        label: 'Refunds',
        icon: <HiOutlineReceiptRefund size={30} />,
        linkUrl: "/admin/allRefunds",
    }
]


const AdminSidebar = ({ active, setActive }) => {
    return (
        <div className="w-[70px] 800px:w-[240px] h-full sticky left-0 pt-3 overflow-y-scroll bg-white shadow-sm">
            {sidebarData && sidebarData.map((item, index) => {
                return (
                    <div className="w-full flex items-center p-4 " onClick={() => setActive(index)} key={index}>
                        <Link to={item.linkUrl} className={`w-full flex items-center ${active === index ? "text-[rgb(132,204,22)]" : "text-[#606060]"}`}>
                            {item.icon}
                            <h5 className='hidden 800px:block pl-2 text-[18px] font-[400]'>
                                {item.label}
                            </h5>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
};

export default AdminSidebar;