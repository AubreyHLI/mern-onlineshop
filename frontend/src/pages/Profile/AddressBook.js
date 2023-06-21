import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { clearError, clearSuccess, deleteUserAddress } from '../../redux/features/userSlice';
import NewAddressForm from '../../components/Profile/NewAddressForm';
import { useOutletContext } from 'react-router-dom';

const AddressBook = () => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const { user } = useSelector((state) => state.user);

    const {isSuccess, success, isError, error} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(5);
		window.scrollTo(0,0);
	},[])

    useEffect(() => {
		if(isSuccess) {
			toast.success(success, {autoClose: 1500});
			dispatch(clearSuccess());
		}
		if(isError) {
			toast.error(error, {autoClose: 2000});
			dispatch(clearError());
		}
	},[isError,isSuccess])

    const handleDelete = (item) => {
        const id = item._id;
        dispatch(deleteUserAddress(id));
    };

    return (
        <div className="w-full px-5">
            {openAddForm && (<NewAddressForm setOpenAddForm={setOpenAddForm} />)}

            <div className="w-full normalFlex justify-between pb-5">
                <h1 className="text-[22px] 800px:text-[26px]">My Addresses</h1>
                <button className="p-2 rounded-lg bg-yellow-400 normalFlex gap-1" onClick={() => setOpenAddForm(true)}>
                    <MdAdd size={24}/>
                    <span className="hidden 500px:inline-block mr-2">Add New Address</span>
                </button>
            </div>

            {user.addresses && user.addresses?.map((item, index) => (
            <div key={index} className="w-full bg-white rounded-[4px] flex items-center px-1 py-4 shadow justify-between pr-5 mb-5">
                <div className='flex flex-col 1100px:flex-row pl-5'>
                    <div className="flex items-center w-[100px]">
                        <h5 className="font-[600]">{item?.addressType}</h5>
                    </div>
                    <div className="flex items-center">
                        <h6 className="text-[15px] 800px:text-[unset]">
                            {item?.address1} {item?.address2}, {item?.city}, {item?.state}, {item?.country}, {item?.zipCode}
                        </h6>
                    </div>
                </div>
                <div className="flex items-center justify-between pl-8">
                    <AiOutlineDelete size={22} className="cursor-pointer" onClick={() => handleDelete(item)} />
                </div>
            </div>
            ))}

            {user && user.addresses.length === 0 && (
            <h5 className="text-center pt-8 text-[18px]">
                You don't have any saved address!
            </h5>
            )}
        </div>
    );
   
}

export default AddressBook;


