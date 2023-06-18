import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Country, State, City }  from 'country-state-city';
import { updateUserAddresses } from '../../redux/features/userSlice';

const NewAddressForm = ({setOpenAddForm}) => {
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");

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
            dispatch(updateUserAddresses({
                country, 
                state,
                city, 
                address1, 
                address2, 
                zipCode, 
                addressType
            }));
            setOpenAddForm(false);
        }
    };

  return (
    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
        <div className="w-full max-w-[700px] h-[85vh] bg-white rounded shadow relative overflow-y-scroll p-4">
            <div className="w-full flex justify-end px-3 pb-0">
                <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpenAddForm(false)} />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
                Add an address
            </h1>

            <form aria-required onSubmit={handleAddAddress} className="w-full">
                <div className="w-full block p-4">
                    <div className="w-full pb-2">
                        <label className="block pb-2">Country</label>
                        <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                            <option value="" className="block border pb-2">
                                choose your country
                            </option>
                            {Country && Country.getAllCountries().map((item) => (<option className="block pb-2" key={item.isoCode} value={item.isoCode}> {item.name}</option>))}
                        </select>
                    </div>

                    <div className="w-full pb-2">
                        <label className="block pb-2">State</label>
                        <select name="" id="" value={state} onChange={(e) => setState(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                            <option value="" className="block border pb-2">
                                choose your state
                            </option>
                            {State && State.getStatesOfCountry(country).map((item) => (<option className="block pb-2" key={item.isoCode} value={item.isoCode}> {item.name}</option>))}
                        </select>
                    </div>

                    <div className="w-full pb-2">
                        <label className="block pb-2">City</label>
                        <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)} className="w-[100%] border h-[36px] rounded-[5px]" >
                            <option value="" className="block border pb-2">
                                choose your city
                            </option>
                            {City && City.getCitiesOfState(country, state).map((item) => (<option className="block pb-2" key={item.isoCode} value={item.isoCode}> {item.name}</option>))}
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
                        <input type="text" className='input' required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
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
  )
}

export default NewAddressForm