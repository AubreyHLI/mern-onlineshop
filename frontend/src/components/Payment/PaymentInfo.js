import React, { useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from 'react-icons/rx';


const PaymentInfo = ({ user, handlePayByCard, handlePayInCash }) => {
    const [select, setSelect] = useState(1);
    const [name, setName] = useState(user?.name);

    const optionsData = { 
        style: {
            base: {
                fontSize: "16px",
                fontWeight: 400,
                color: "#444",
            },
            empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": { color: "#a0aec0",},
            },
        }, 
    };


    return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
        {/* pay with card */}
        <div>
            <div className="flex w-full pb-5 border-b">
                <div onClick={() => setSelect(1)} className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 1 && <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Pay with Debit/credit card
                </h4>
            </div>

            {select === 1 &&
            <div className="w-full flex border-b py-5">
                <form className="w-full" onSubmit={handlePayByCard}>
                    <div className="w-full flex pb-3">
                        <div className="w-[50%]">
                            <label className="block pb-2">Name On Card</label>
                            <input value={name} required  placeholder={user?.name} onChange={e => setName(e.target.value)} className='input !w-[95%] text-[#444] placeholder:text-[#a0aec0] placeholder:font-[500]'/>
                        </div>
                        <div className="w-[50%]">
                            <label className="block pb-2">Exp Date</label>
                            <CardExpiryElement 
                                className='input pt-2' 
                                options={optionsData} 
                            />
                        </div>
                    </div>
                    <div className="w-full flex pb-3">
                        <div className="w-[50%]">
                            <label className="block pb-2">Card Number</label>
                            <CardNumberElement
                                className='input !w-[95%] pt-2'
                                options={optionsData}
                            />
                        </div>
                        <div className="w-[50%]">
                            <label className="block pb-2">Card Verification Value/Code</label>
                            <CardCvcElement
                                className='input pt-2'
                                options={optionsData}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type="submit" value="Submit" className='button !bg-[black] !text-white font-[600] !mb-0' />
                    </div>
                </form>
            </div>
            }
        </div>


        {/* cash on delivery */}
        <div>
            <div className="flex w-full py-5 border-b">
                <div onClick={() => setSelect(2)} className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 2 && <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" /> }
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Cash on Delivery
                </h4>
            </div>

            {/* cash on delivery */}
            {select === 2 &&
            <div className="w-full flex justify-center py-2 border-b">
                <div onClick={handlePayInCash} className='button !bg-[black] !text-white font-[600]' >
                    Confirm2
                </div>
            </div>
            }
        </div>
    </div>
    );
};

export default PaymentInfo