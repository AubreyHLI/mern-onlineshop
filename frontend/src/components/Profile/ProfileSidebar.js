import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const sidebarData = [
	{
		label: 'Profile',
		icon: <RxPerson size={25} />,
		linkUrl: "/profile",
	},
	{
		label: 'Orders',
		icon: <HiOutlineShoppingBag size={25} />,
		linkUrl: "/profile/orders",
	},
	{
		label: 'Refunds',
		icon: <HiOutlineReceiptRefund size={25} />,
		linkUrl: "/profile/refunds",
	},
	{
		label: 'Inbox',
		icon: <AiOutlineMessage size={25} />,
		linkUrl: '/',
	},
	{
		label: 'Change Password',
		icon: <RiLockPasswordLine size={25} />,
		linkUrl: "/profile/change-password",
	},
	{
		label: 'Addresses',
		icon: <TbAddressBook size={25} />,
		linkUrl: "/profile/addresses",
	},  
]

const ProfileSidebar = ({ active }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logoutUser())
        .then((response) => {
			toast.success(response.payload.message); 
			navigate('/');
        })
    }

	return (
	<div className="w-full h-full sticky left-0 p-4 pt-6 overflow-y-scroll bg-white shadow-sm rounded-[10px]">
		{sidebarData && sidebarData.map((item, index) => {
			return (
				<div className="w-full flex items-center py-4 px-3 lg:p-4" key={index}>
					<Link to={item.linkUrl} className={`w-full flex items-center ${active === index ? "text-[red]" : " "}`}>
						{item.icon}
						<h5 className='hidden lg:block pl-2 font-[400]'>
							{item.label}
						</h5>
					</Link>
				</div>
			)
		})}
		<div className="single_item w-full flex items-center py-4 px-3 lg:p-4" onClick={handleLogout} key={7}>
			<div className={`w-full flex items-center cursor-pointer ${active === 7 ? "text-[red]" : " "}`}>
				<AiOutlineLogin size={25} color={active === 7 ? "red" : ""} />
				<h5 className='hidden lg:block pl-2 font-[400]'>
					Log out
				</h5>
			</div>
		</div>
	</div>
	);
};

export default ProfileSidebar;