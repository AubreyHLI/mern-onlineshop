import React from 'react'

const CheckoutSteps = ({active}) => {
    return (
    <div className='w-full flex justify-center mt-8'>
        <div className="w-[90%] normalFlex justify-center flex-wrap">
            <div className='normalFlex'>
                <div className='cart_button'>
                    <span className='cart_button_text'>1<span className='hidden 500px:inline'>.Shipping</span></span>
                </div>
            </div>

            <div className='normalFlex'>
                <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 1 ? "!bg-[#f63b60]": "!bg-[#FDE1E6]" }`} />
                <div className={`cart_button ${active === 1 && '!bg-[#FDE1E6]'}`}>
                    <span className={`cart_button_text ${active === 1 && '!text-[#f63b60]'}`}>
                        2<span className='hidden 500px:inline'>.Payment</span>
                    </span>
                </div>
            </div>

            <div className='normalFlex'>
                <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 2 ? " !bg-[#f63b60]": "!bg-[#FDE1E6]"}`} />
                <div className={`cart_button ${active < 3 && '!bg-[#FDE1E6]'}`}>
                    <span className={`cart_button_text ${active < 3 && '!text-[#f63b60]'}`}>
                        3<span className='hidden 500px:inline'>.Success</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CheckoutSteps