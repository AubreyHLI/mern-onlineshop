import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const ProfileSidebar = ({ active, setActive }) => {
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
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div onClick={() => setActive(1)} className="flex items-center cursor-pointer w-full mb-8">
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : "" } 800px:block hidden`}>
          Profile
        </span>
      </div>

      <div onClick={() => setActive(2)} className="flex items-center cursor-pointer w-full mb-8" >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : "" } 800px:block hidden`}>
          Orders
        </span>
      </div>

      <div onClick={() => setActive(3)} className="flex items-center cursor-pointer w-full mb-8">
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : "" } 800px:block hidden`}>
          Refunds
        </span>
      </div>

      <div onClick={() => setActive(4)} className="flex items-center cursor-pointer w-full mb-8">
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : "" } 800px:block hidden`}>
          Inbox
        </span>
      </div>

      <div onClick={() => setActive(5)} className="flex items-center cursor-pointer w-full mb-8">
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ?  "text-[red]" : "" } 800px:block hidden`}>
          Track Order
        </span>
      </div>

      <div onClick={() => setActive(6)} className="flex items-center cursor-pointer w-full mb-8">
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ?  "text-[red]" : "" } 800px:block hidden`}>
          Change Password
        </span>
      </div>

      <div onClick={() => setActive(7)} className="flex items-center cursor-pointer w-full mb-8">
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active === 7 ?  "text-[red]" : "" } 800px:block hidden`}>
          Address
        </span>
      </div>

      <div onClick={handleLogout} className="single_item flex items-center cursor-pointer w-full mb-8">
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ?  "text-[red]" : "" } 800px:block hidden`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;