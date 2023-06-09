import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../static/server";
import { toast } from "react-toastify";
import axios from "axios";
import AddressesList from "./AddressesList";
import { selectAllCartItems } from "../../redux/features/shoppingcartSlice";
import CartSummary from "./CartSummary";


const CheckoutContent = () => {
    const user = useSelector((state) => state.user.user);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [inputCouponCode, setInputCouponCode] = useState("");

    const [couponValid, setCouponValid] = useState(false);
    const [discountTotal, setDiscountTotal] = useState(null);
    const [openAddressbook, setOpenAddressbook] = useState(false);
    
    const cartItems = useSelector(selectAllCartItems);
    const navigate = useNavigate();


    const handleChooseAddress = (item) => {
        setAddress1(item?.address1);
        setAddress2(item?.address2);
        setZipCode(item?.zipCode);
        setCountry(item?.country);
        setState(item?.state);
        setCity(item?.city);
    }


    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`${SERVER_URL}/coupons/getCouponByCode/${inputCouponCode}`, { withCredentials: true })
            const existsCoupon = response.data.coupon;
            const targetProducts = cartItems?.filter(item => item.product.brandId === existsCoupon.selectedBrandId);
            if(targetProducts.length > 0 ) {
                const targetPrice = targetProducts.reduce((total, item) => total + item.qty * item.product.discountPrice, 0);
                const discount = targetPrice * (existsCoupon.value / 100 );
                setDiscountTotal(discount);
                setCouponValid(true);
            } else {
                toast.error(`Coupon code "${inputCouponCode}" is not valid for this order`);
                setCouponValid(false);
                setInputCouponCode("");
            }
        } catch(error) {
            toast.error(error.response.data.message);
        }
    };


    const subTotalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.product.discountPrice ? item.product.discountPrice : item.product.originalPrice;
        return total + item.qty * itemPrice;
     }, 0
    );
    const shipping = subTotalPrice * 0.1;
    const discount = couponValid ? discountTotal : "";
    const totalPrice = couponValid ? (subTotalPrice + shipping - discount).toFixed(2) : (subTotalPrice + shipping).toFixed(2);


    const handleClickPayment = () => {
        if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === ""){
            toast.error("Please choose your delivery address!")
        } else{
            const shippingAddress = { name, phoneNumber, email, address1, address2, zipCode, country, state, city, };
            const orderData = { cartItems, totalPrice, subTotalPrice, shipping, discountTotal, shippingAddress, user, };
            // update local storage with the updated orders array
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/checkout/payment");
        }
    };


    return (
    <div className="w-full flex flex-col items-center py-8 mb-4">
        <div className="w-[90%] max-w-[1200px] block 800px:flex">
            <div className="w-full 800px:w-[65%] 1000px:w-[80%]">
                {/* shipping info */}
                <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
                    <h5 className="text-[20px] font-[600]">Shipping Address</h5>
                
                    <form className="mt-5 grid grid-cols-1 500px:grid-cols-2 gap-y-3 w-full">
                        <div>
                            <label className="block pb-2">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className='input !w-[95%]'/>
                        </div>
                        <div>
                            <label className="block pb-2">Phone Number</label>
                            <input type="text" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}  className='input'/>
                        </div>
                        <div className="col-span-2">
                            <label className="block pb-2">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className='input' />
                        </div>
                        <div>
                            <label className="block pb-2">Country</label>
                            <select className="w-[95%] border h-[40px] rounded-[5px]" value={country} onChange={(e) => setCountry(e.target.value)} >
                                <option className="block pb-2" value="" key='0'>
                                    Choose your country
                                </option>
                                { Country &&  Country.getAllCountries().map((item) => 
                                <option key={item.isoCode} value={item.isoCode}>{item.name} </option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block pb-2">State</label>
                            <select className="w-full border h-[40px] rounded-[5px]" value={state} onChange={(e) => setState(e.target.value)} >
                                <option className="block pb-2" value="" key='0'>
                                    Choose your State
                                </option>
                                { State && State.getStatesOfCountry(country).map((item) => 
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block pb-2">City</label>
                            <select className="w-[95%] border h-[40px] rounded-[5px]" value={city} onChange={(e) => setCity(e.target.value)} >
                                <option className="block pb-2" value="" key='0'>
                                    Choose your City
                                </option>
                                { City && City.getCitiesOfState(country, state).map((item) => 
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block pb-2">Zip Code</label>
                            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className='input' />
                        </div>

                        <div className="col-span-2">
                            <label className="block pb-2">Address1</label>
                            <input type="address" required value={address1} onChange={(e) => setAddress1(e.target.value)} className='input' />
                        </div>
                        <div className="col-span-2">
                            <label className="block pb-2">Address2</label>
                            <input type="address" value={address2} onChange={(e) => setAddress2(e.target.value)} required className='input' />
                        </div>
                        <div></div>
                    </form>
                    

                    <div className="w-full mt-3">
                        <h4 className="text-blue-600 cursor-pointer" onClick={() => setOpenAddressbook(true)}>
                            Choose from saved address
                        </h4>
                        { openAddressbook && 
                        <AddressesList 
                            handleChooseAddress={handleChooseAddress} 
                            setOpenAddressbook={setOpenAddressbook}    
                        />}
                    </div>
                </div>
            </div>
            
            <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                 {/* cart summary */}
                <div className="w-full bg-[#fff] rounded-md flex flex-col gap-1 px-5 py-4">
                    <CartSummary 
                        subTotalPrice={subTotalPrice}
                        shipping={shipping}  
                        discount={discount}
                        totalPrice={totalPrice}
                    />                                       
                    <form onSubmit={handleApplyCoupon} className="mt-3">
                        <input type="text" className='input h-[40px] pl-2' placeholder="Coupon code" value={inputCouponCode} onChange={(e) => setInputCouponCode(e.target.value)} required />
                        <input type="submit" value="Apply code" required className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-4 cursor-pointer`}/>
                    </form>
                </div>
            </div>
        </div>

        <div className='button w-[150px] 800px:w-[280px] !mt-8 font-[600]' onClick={handleClickPayment}>
            <h5>Go to Payment</h5>
        </div>
    </div>
    );
};

export default CheckoutContent