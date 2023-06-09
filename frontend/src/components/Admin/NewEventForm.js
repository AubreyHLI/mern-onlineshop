import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectAllProducts } from "../../redux/features/productsSlice";
import { fetchAllEvents, clearSuccess, clearError, createEvent } from "../../redux/features/eventsSlice";
import { BACKEND_URL } from "../../static/server";
import { RxCross1 } from "react-icons/rx";

const NewEventForm = ({setOpenAddForm}) => {
	const [description, setDescription] = useState("");
	const [discountPrice, setDiscountPrice] = useState();
	const [startDate,setStartDate] = useState(null);
	const [endDate,setEndDate] = useState(null);
	// event product
	const [productInput, setProductInput] = useState("");
    const [searchData, setSearchData] = useState(null);
	const [selectedProductId, setSelectedProductId] = useState();
	const [showProductInfo, setShowProductInfo] = useState(false);
	const [originalPrice, setOriginalPrice] = useState();
	const [stock, setStock] = useState();

	const { isSuccess, isError, error } = useSelector((state) => state.events);
	const allProducts = useSelector(selectAllProducts);

	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		if (isSuccess) {
			toast.success("Event created successfully!");
			setOpenAddForm(false);
			dispatch(clearSuccess());
		}
		if (isError) {
			toast.error(error);
			dispatch(clearError());
		}
	}, [isError, isSuccess]);


	const handleSearchChange = (e) => {
        setProductInput(e.target.value);
        const filteredProducts = allProducts.filter( p => 
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchData(filteredProducts);
    }

	const handleProductSelect = (item) => {
		console.log(item._id);
		setSelectedProductId(item._id);
		setProductInput(item.name);
		setOriginalPrice(item.originalPrice);
		setStock(item.stock);
		// clear search data and show product details
		setSearchData("");
		setShowProductInfo(true);
	}

	const handleStartDateChange = (e) => {
		const start = new Date(e.target.value);
		setStartDate(start);
		setEndDate(null);
	}

	const handleEndDateChange = (e) => {
		const end = new Date(e.target.value);
		setEndDate(end);
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createEvent({
			productId: selectedProductId,
			description: description,
			discountPrice: discountPrice,
			start_Date: startDate.toISOString(),
			finish_Date: endDate.toISOString(),
		}));
	};
	

	const today = new Date().toISOString().slice(0,10);

	// The earliest date to accept for endDate
	const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) : "";

	return (
	<div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
		<div className="w-[95%] 800px:w-[70%] h-[90vh] bg-white rounded shadow p-8 overflow-y-scroll">
			<div className="w-full flex justify-end cursor-pointer">
				<RxCross1 size={25} onClick={() => setOpenAddForm(false)} />
			</div>
			<h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
			{/* create event form */}
			<form onSubmit={handleSubmit}>
				<br/>
				<div className="w-full relative">
					<label className="pb-2">
						Event Product <span className="text-red-500">*</span>
					</label>
					<div className="w-full relative">
						<input 
							type="text" 
							placeholder="Search Product..." 
							value={productInput} 
							onChange={handleSearchChange} 
							className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<AiOutlineSearch size={20} className="absolute right-4 top-1.5 cursor-pointer" />
					</div>
					{ searchData && searchData.length !== 0 && productInput
					? <div className="absolute w-full bg-[#f5f5f5] shadow-sm-2 z-10 px-2 py-1 divide-y divide-slate-200">
						{ searchData && searchData.map((item, index) => 
							<div className="w-full flex items-start-py-3 py-1" key={index} onClick={() => handleProductSelect(item)}>
								<img src={`${BACKEND_URL}${item?.images[0]}`} alt="" className="w-[28px] h-[28px] mr-[10px]"/>
								<h1 className="text-[14px]">{item.name}</h1>
							</div>
						)}
						</div>
					: null }
				</div>

				<br />
				<div>
					<label className="pb-2">
						Event Description <span className="text-red-500">*</span>
					</label>
					<textarea
						cols="30"
						required
						rows="8"
						type="text"
						name="description"
						value={description}
						className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter your event description..."
					></textarea>
				</div>

				{ showProductInfo && <>
					<br/>
					<div>
						<label className="pb-2">
							ProductId <span className="text-red-500">*</span>
						</label>
						<input disabled type="text" name="productId" value={selectedProductId}
							className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px sm:text-sm"
						/>
					</div>

					<br/>
					<div>
						<label className="pb-2">
							Stock <span className="text-red-500">*</span>
						</label>
						<input disabled type="number" name="stock" value={stock}
							className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px sm:text-sm"
						/>
					</div>

					<br/>
					<div>
						<label className="pb-2">
							Original price <span className="text-red-500">*</span>
						</label>
						<input disabled type="number" name="price" value={originalPrice}
							className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px sm:text-sm"
						/>
					</div>
				</>
				}

				<br />
				<div>
					<label className="pb-2">
						Price (With Discount) <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						name="discountPrice"
						value={discountPrice}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setDiscountPrice(e.target.value)}
						placeholder="Enter your event product price with discount..."
					/>
				</div>


				<br />
				<div>
					<label className="pb-2">
						Event Start Date <span className="text-red-500">*</span>
					</label>
					<input
						type="date"
						name="price"
						id="start-date"
						value={startDate ? startDate.toISOString().slice(0,10) : ""}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={handleStartDateChange}
						min={today}
						placeholder="Enter your event product stock..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Event End Date <span className="text-red-500">*</span>
					</label>
					<input
						type="date"
						name="price"
						id="end-date"
						value={endDate ? endDate.toISOString().slice(0,10) : ""}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={handleEndDateChange}
						min={minEndDate}
						placeholder="Enter your event product stock..."
					/>
				</div>

				<br />
				<div>
					<input type="submit" value="Create new event" className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
				</div>
			</form>
		</div>
	</div>
	);
};

export default NewEventForm;