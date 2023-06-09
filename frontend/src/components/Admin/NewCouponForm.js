import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, clearSuccess, clearError } from '../../redux/features/couponSlice';
import { toast } from 'react-toastify';
import { selectAllBrands } from '../../redux/features/brandsSlice';

const NewCouponForm = ({setOpenAddForm}) => {
    const [code, setCode] = useState("");
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [value, setValue] = useState(null);

    const allBrands = useSelector(selectAllBrands);
    const {isSuccess, success, isError, error} = useSelector(state => state.coupons);
    const dispatch = useDispatch();

    useEffect(() => {
		if (isSuccess) {
			toast.success(success);
			setOpenAddForm(false);
			dispatch(clearSuccess());
		}
		if (isError) {
			toast.error(error);
			dispatch(clearError());
		}
	}, [isError, isSuccess]);


	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createCoupon({
			code,
            minAmount,
            maxAmount,
            value,
            selectedBrandId,
		}));
	};

  return (
    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
		<div className="w-[95%] 800px:w-[70%] h-[90vh] bg-white rounded shadow p-8 overflow-y-scroll">
			<div className="w-full flex justify-end cursor-pointer">
				<RxCross1 size={25} onClick={() => setOpenAddForm(false)} />
			</div>
			<h5 className="text-[30px] font-Poppins text-center">Create New Coupon</h5>
            <form onSubmit={handleSubmit} aria-required={true}>
                <br />
                <div>
                    <label className="pb-2">Code <span className="text-red-500">*</span></label>
                    <input type="text" name="code" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your coupon code ..."
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Discount Percentenge{" "}<span className="text-red-500">*</span></label>
                    <input type="text" name="value" value={value} required onChange={(e) => setValue(e.target.value)} placeholder="Enter your coupon code value..."
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Min Amount</label>
                    <input type="number" name="value" value={minAmount} onChange={(e) => setMinAmout(e.target.value)} placeholder="Enter your coupon code min amount..."
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Max Amount</label>
                    <input type="number" name="value" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="Enter your coupon code max amount..."
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Selected Brand</label>
                    <select  value={selectedBrandId} onChange={(e) => setSelectedBrandId(e.target.value)} className="w-full mt-2 border h-[35px] rounded-[5px]" >
                        <option value="Choose your selected brands">Choose a selected brand</option>
                        {allBrands && allBrands.map((i) => (
                            <option value={i._id} key={i.name}>{i.name}</option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <input type="submit" value="Create" className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default NewCouponForm