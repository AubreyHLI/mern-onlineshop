import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { categoriesData } from '../../static/data';
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { clearSuccess, clearError, createProduct, fetchAllProducts } from "../../redux/features/productsSlice";
import { selectAllBrands } from "../../redux/features/brandsSlice";


const NewProductForm = ({setOpenAddForm}) => {
	const [images, setImages] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [tags, setTags] = useState("");
	const [originalPrice, setOriginalPrice] = useState();
	const [discountPrice, setDiscountPrice] = useState();
	const [stock, setStock] = useState();
	const [brandId, setBrandId] = useState();

	const allBrands = useSelector(selectAllBrands);
	const { isSuccess, isError, error } = useSelector((state) => state.products);
	const dispatch = useDispatch();


	useEffect(() => {
		if (isSuccess) {
			toast.success("Product created successfully!");
			setOpenAddForm(false);
			dispatch(clearSuccess());
		}
		if (isError) {
			toast.error(error);
			dispatch(clearError());
		}
	}, [isError, isSuccess]);


	const handleImageChange = (e) => {
		e.preventDefault();
		let files = Array.from(e.target.files);
		setImages((prevImages) => [...prevImages, ...files]);
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		const newForm = new FormData();
		console.log('brandId:',brandId);
		images.forEach((image) => {
			newForm.append("images", image);
		});
		newForm.append("name", name);
		newForm.append("brandId", brandId);
		newForm.append("description", description);
		newForm.append("category", category);
		newForm.append("tags", tags);
		newForm.append("originalPrice", originalPrice);
		if(!discountPrice) {
			newForm.append("discountPrice", 0);
		} else {
			newForm.append("discountPrice", discountPrice);
		}
		newForm.append("stock", stock);

		dispatch(createProduct(newForm));
	};


	return (
	<div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
		<div className="w-[95%] 800px:w-[70%] h-[90vh] bg-white rounded shadow p-8 overflow-y-scroll">
			<div className="w-full flex justify-end cursor-pointer">
				<RxCross1 size={25} onClick={() => setOpenAddForm(false)} />
			</div>
			<h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
			{/* create product form */}
			<form onSubmit={handleSubmit}>
				<br />
				<div>
					<label className="pb-2">
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="name"
						value={name}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your product name..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Brand <span className="text-red-500">*</span>
					</label>
					<select className="w-full mt-2 border h-[35px] rounded-[5px]" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
						<option value="Choose a brand">Choose a brand</option>
						{allBrands && allBrands?.map((i) => <option value={i._id} key={i._id}>{i.name}</option>)}
					</select>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Description <span className="text-red-500">*</span>
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
						placeholder="Enter your product description..."
					></textarea>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Category <span className="text-red-500">*</span>
					</label>
					<select	className="w-full mt-2 border h-[35px] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="Choose a category">Choose a category</option>
						{categoriesData && categoriesData.map((i) => <option value={i.category} key={i.category}> {i.title} </option>)}
					</select>
				</div>

				<br />
				<div>
					<label className="pb-2">Tags</label>
					<input
						type="text"
						name="tags"
						value={tags}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setTags(e.target.value)}
						placeholder="Enter your product tags..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Original Price <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						name="price"
						value={originalPrice}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setOriginalPrice(e.target.value)}
						placeholder="Enter your product price..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Price (With Discount) 
					</label>
					<input
						type="number"
						name="price"
						value={discountPrice}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setDiscountPrice(e.target.value)}
						placeholder="Enter your product price with discount..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Product Stock <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						name="price"
						value={stock}
						className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						onChange={(e) => setStock(e.target.value)}
						placeholder="Enter your product stock..."
					/>
				</div>

				<br />
				<div>
					<label className="pb-2">
						Upload Images <span className="text-red-500">*</span>
					</label>
					<input
						type="file"
						name=""
						id="upload"
						className="hidden"
						multiple
						onChange={handleImageChange}
					/>
					<div className="w-full flex items-center flex-wrap">
						<label htmlFor="upload">
							<AiOutlinePlusCircle size={30} className="mt-3 cursor-pointer" color="#555" />
						</label>
						{images && images.map((i) => (
							<img src={URL.createObjectURL(i)} key={i} alt="" className="h-[120px] w-[120px] object-cover m-2" />
						))}
					</div>
					<br />
					<div>
						<input type="submit" value="Create" className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
					</div>
				</div>

			</form>
		</div>
	</div>
	);
};

export default NewProductForm;

