import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const AddressesList = ({handleChooseAddress, setOpenAddressbook}) => {
    const user = useSelector((state) => state.user.user);
    
    return (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
            <div className="w-full max-w-[700px] h-[85vh] bg-white rounded shadow relative overflow-y-scroll p-4">
                <div className="w-full flex justify-end pb-0">
                    <RxCross1 size={26} className="cursor-pointer" onClick={() => setOpenAddressbook(false)} />
                </div>
                <h1 className="text-center text-[22px] 800px:text-[25px] font-Poppins">
                    Your Saved Addresses
                </h1>
                <div className='mt-5'>
                    {user?.addresses?.length > 0 
                    ? <>
                    {user.addresses?.map((item, index) => (
                    <div key={index} className="w-full bg-white rounded-[4px] flex p-4 shadow mb-5 hover:bg-stone-100">
                        <input type="radio" id={index} name='selectedAddress' value={item.addressType} className='cursor-pointer' onClick={() => handleChooseAddress(item)}/>
                        <label htmlFor={index} className='flex flex-col 1100px:flex-row ml-5 w-full'>
                            <div className="flex items-center w-[70px]">
                                <h5 className="font-[600]">{item?.addressType}</h5>
                            </div>
                            <div className="flex items-center">
                                <h6 className="text-[15px] 800px:text-[unset]">
                                    {item?.address1} {item?.address2}, {item?.city}, {item?.state}, {item?.country}, {item?.zipCode}
                                </h6>
                            </div>
                        </label>
                    </div>
                    ))}
                    </>
                    :<h5 className="text-center pt-8 text-[18px]">
                        You don't have any saved address!
                    </h5>
                    }
                </div>                
            </div>
        </div>
    )
}

export default AddressesList;