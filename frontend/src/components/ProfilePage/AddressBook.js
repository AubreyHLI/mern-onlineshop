import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddressBook = () => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
        { name: "Default", },
        { name: "Home", }, 
        { name: "Office", },
    ];

    const handleAddAddress = async (e) => {
        e.preventDefault();

        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!");
        } else {
            // dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType));
            setOpenAddForm(false);
            setCountry("");
            setCity("");
            setAddress1("");
            setAddress2("");
            setZipCode(null);
            setAddressType("");
        }
    };

    const handleDelete = (item) => {
        const id = item._id;
        // dispatch(deleteUserAddress(id));
    };

    return (
        <div className="w-full px-5">
            {openAddForm && (
            <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
                <div className="w-full max-w-[600px] h-[85vh] bg-white rounded shadow relative overflow-y-scroll">
                    <div className="w-full flex justify-end p-3 pb-0">
                        <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpenAddForm(false)} />
                    </div>
                    <h1 className="text-center text-[25px] font-Poppins">
                        Add New Address
                    </h1>
                    <div className="w-full">
                        <form aria-required onSubmit={handleAddAddress} className="w-full">
                            <div className="w-full block p-4">
                                <div className="w-full pb-2">
                                    <label className="block pb-2">Country</label>
                                    <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                                        <option value="" className="block border pb-2">
                                            choose your country
                                        </option>
                                        {/* {Country && Country.getAllCountries().map((item) => (<option className="block pb-2" key={item.isoCode} value={item.isoCode}> {item.name}</option>))} */}
                                    </select>
                                </div>

                                <div className="w-full pb-2">
                                  <label className="block pb-2">City</label>
                                    <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                                        <option value="" className="block border pb-2">
                                            choose your city
                                        </option>
                                        {/* {State && State.getStatesOfCountry(country).map((item) => (<option className="block pb-2" key={item.isoCode} value={item.isoCode}> {item.name}</option>))} */}
                                    </select>
                                </div>

                                <div className="w-full pb-2">
                                    <label className="block pb-2">Address 1</label>
                                    <input type="text" className='input' required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                </div>

                                <div className="w-full pb-2">
                                    <label className="block pb-2">Address 2</label>
                                    <input type="text" className='input' required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                </div>

                                <div className="w-full pb-2">
                                    <label className="block pb-2">Zip Code</label>
                                    <input type="number" className='input' required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                </div>

                                <div className="w-full pb-2">
                                    <label className="block pb-2">Address Type</label>
                                    <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                                        <option value="" className="block border pb-2">
                                            choose your Address Type
                                        </option>
                                        {addressTypeData && addressTypeData.map((item) => (<option className="block pb-2" key={item.name} value={item.name}>{item.name}</option>))}
                                    </select>
                                </div>

                                <div className=" w-full pb-2">
                                    <input type="submit" className='input mt-5 cursor-pointer' required readOnly />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}

            <div className="flex w-full items-center justify-between pb-5">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    My Addresses
                </h1>
                <div onClick={() => setOpenAddForm(true)} className='button !rounded-md'>
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>

            {/*  
            {user && user.addresses.map((item, index) => (
            <div key={index} className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5">
                <div className="flex items-center">
                    <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                        {item.address1} {item.address2}
                    </h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                        {user && user.phoneNumber}
                    </h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" onClick={() => handleDelete(item)} />
                </div>
            </div>
            ))}

            {user && user.addresses.length === 0 && (
            <h5 className="text-center pt-8 text-[18px]">
                You not have any saved address!
            </h5>
            )}
            */}

            <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5">
                <div className="flex items-center">
                    <h5 className="pl-5 font-[600]">Default</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                       Room 301, Portobello House, 3 Portobello Street, South Youkshire, Sheffield, United Kingdom
                    </h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                        44-07869902760
                    </h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" onClick={() => handleDelete()} />
                </div>
            </div>

        </div>
    );
}

export default AddressBook;


