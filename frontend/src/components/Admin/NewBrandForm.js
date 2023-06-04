import React, { useEffect, useState } from 'react'
import { RxAvatar, RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearSuccess, clearError, createBrand, fetchAllBrands } from '../../redux/features/brandsSlice';


const NewBrandForm = ({setOpenAddForm}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState();
    const {isSuccess, isError, error} = useSelector(state => state.brands);

    const dispatch = useDispatch();

    useEffect(() => {
		if (isSuccess) {
			toast.success("Brand created successfully!");
			setOpenAddForm(false);
			dispatch(clearSuccess());
		}
		if (isError) {
			toast.error(error.response.data.message);
			dispatch(clearError());
		}
	}, [isError, isSuccess]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newForm = new FormData();
        newForm.append("file", avatar);
        newForm.append("name", name);
        newForm.append("description", description);
        
        dispatch(createBrand(newForm));
    };
    

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };


    return (
    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
		<div className="w-[95%] 800px:w-[70%] h-[90vh] bg-white rounded shadow p-8 overflow-y-scroll">
			<div className="w-full flex justify-end cursor-pointer">
				<RxCross1 size={25} onClick={() => setOpenAddForm(false)} />
			</div>
			<h5 className="text-[30px] font-Poppins text-center">Create New Brand</h5>

            <form onSubmit={handleSubmit}>
                <br />
                <div>
                <label className="pb-2">
                    Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your product brand..."
                />
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
            
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700"></label>
                    <div className="mt-2 flex items-center">
                        <span className="inline-block h-24 w-24 rounded-full overflow-hidden">
                            {avatar 
                            ? <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />
                            : <RxAvatar className="h-24 w-24" />
                            }
                        </span>
                        <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <span>Upload a picture</span>
                        <input
                            type="file"
                            id="file-input"
                            name="avatar"
                            onChange={handleFileInputChange}
                            className="sr-only"
                        />
                        </label>
                    </div>
                </div>

                <br />
                <div>
                    <input type="submit" value="Create new brand" className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
            </form>
        </div>
    </div>
    )
}

export default NewBrandForm