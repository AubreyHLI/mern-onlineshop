import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const ProfileContent = ({ active }) => {
	const user = useSelector(state => state.user.user);
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
	const [zipCode, setZipCode] = useState(user?.zipCode);
	const [address1, setAddress1] = useState(user?.address1);
	const [address2, setAddress2] = useState(user?.address2);
	

	const handleSubmit = (e) => {
		e.preventDefault();

	}

	return (
	<>
		<div className="flex justify-center w-full pb-10 pr-5">
			<CgProfile size={80} color='rgb(120 113 108)'/>
		</div>
		
		<div className="w-full">
			<form onSubmit={handleSubmit} aria-required={true}>			
				<div className="w-full 800px:flex block pb-3">
					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Full Name</label>
						<input type="text" className='input !w-[95%] mb-4 800px:mb-0' required value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Email Address</label>
						<input type="text" className='input !w-[95%] mb-4 800px:mb-0' required value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
				</div>

				<div className="w-full 800px:flex block pb-3">
					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Phone Number</label>
						<input type="tel" className='input !w-[95%] mb-4 800px:mb-0' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
					</div> 

					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Zip Code</label>
						<input type="text" className='input !w-[95%] mb-4 800px:mb-0' required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
					</div>
				</div>

				<div className="w-full 800px:flex block pb-3">
					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Address 1</label>
						<input type="text" className='input !w-[95%] mb-4 800px:mb-0' required value={address1} onChange={(e) => setAddress1(e.target.value)}/>
					</div> 

					<div className="w-[100%] 800px:w-[50%]">
						<label className="block pb-2">Address 2</label>
						<input type="text" className='input !w-[95%] mb-4 800px:mb-0' required value={address2} onChange={(e) => setAddress2(e.target.value)}/>
					</div> 
				</div>

				<div className="width-full mt-8 text-right">
					<input type="submit" value="Update" required className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] cursor-pointer`} />
				</div>
			</form>
		</div>
	</>
	);
};

export default ProfileContent;