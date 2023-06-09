import React, { useState } from 'react'
// import { CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from 'react-icons/rx';


const PaymentInfo = ({ user, open, setOpen, onApprove, createOrder, paymentHandler, cashOnDeliveryHandler }) => {
    const [select, setSelect] = useState(1);

    const optionsData = { 
        style: {
            base: {
                fontSize: "19px",
                lineHeight: 1.5,
                color: "#444",
            },
            empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": {
                    color: "#444",
                },
            },
        }, 
    }

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
                <form className="w-full" onSubmit={paymentHandler}>
                    <div className="w-full flex pb-3">
                        <div className="w-[50%]">
                            <label className="block pb-2">Name On Card</label>
                            <input value={user?.name} required  placeholder={user?.name} className='input !w-[95%] text-[#444]'/>
                        </div>
                        <div className="w-[50%]">
                            <label className="block pb-2">Exp Date</label>
                            {/* <CardExpiryElement 
                                className='input' 
                                options={optionsData} 
                            /> */}
                        </div>
                    </div>
                    <div className="w-full flex pb-3">
                        <div className="w-[50%]">
                            <label className="block pb-2">Card Number</label>
                            {/* <CardNumberElement
                                className='input !h-[35px] !w-[95%]'
                                options={optionsData}
                            /> */}
                        </div>
                        <div className="w-[50%]">
                            <label className="block pb-2">CVV</label>
                            {/* <CardCvcElement
                                className='input !h-[35px]'
                                options={optionsData}
                            /> */}
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type="submit" value="Submit" className='button !bg-[black] !text-white font-[600] !mb-0' />
                    </div>
                </form>
            </div>
            }
        </div>


        {/* paypal payment */}
        <div>
            <div className="flex w-full py-5 border-b">
                <div onClick={() => setSelect(2)} className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 2 && <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" /> }
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Pay with Paypal
                </h4>
            </div>
            {/* pay with payement */}
            {select === 2 && 
            <div className="w-full flex justify-center border-b py-2">
                <div onClick={() => setOpen(true)} className='button !bg-[black] !text-white font-[600]' >
                    Pay Now
                </div>
                {open && 
                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                    <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                        <div className="w-full flex justify-end p-3">
                            <RxCross1 size={30} className="cursor-pointer absolute top-3 right-3" onClick={() => setOpen(false)} />
                        </div>
                        {/* <PayPalScriptProvider
                            options={{
                                "client-id":
                                "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                            }}
                            >
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                onApprove={onApprove}
                                createOrder={createOrder}
                            />
                        </PayPalScriptProvider> */}
                    </div>
                </div>
                }
            </div>
            }
        </div>


        {/* cash on delivery */}
        <div>
            <div className="flex w-full py-5 border-b">
                <div onClick={() => setSelect(3)} className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 3 && <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" /> }
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Cash on Delivery
                </h4>
            </div>

            {/* cash on delivery */}
            {select === 3 &&
            <div className="w-full flex justify-center py-2 border-b">
                {/* <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                    <input type="submit" value="Confirm" className='button !bg-[black] !text-white font-[600]'/>
                </form> */}
                <div onClick={cashOnDeliveryHandler} className='button !bg-[black] !text-white font-[600]' >
                    Confirm2
                </div>
            </div>
            }
        </div>
    </div>
    );
};

export default PaymentInfo