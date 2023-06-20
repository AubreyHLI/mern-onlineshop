import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearSuccess, updateUserInfo } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { useOutletContext } from 'react-router-dom';

const ProfilePage = () => {
	const user = useSelector(state => state.user.user);
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
	const [isEditName, setIsEditName] = useState(false);
	const [isEditEmail, setIsEditEmail] = useState(false);
	const [isEditPhone, setIsEditPhone] = useState(false);

	const {isSuccess, isError, error} = useSelector(state => state.user);
	const dispatch = useDispatch();
	const {setActive} = useOutletContext();

    useEffect(() => {
		setActive(0);
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        if(isSuccess) {
			toast.success("Account infomation updated successfully!", {autoClose: 1000});
			dispatch(clearSuccess());
		} 
		if(isError) {
			toast.error(error, {autoClose: 2000});
			dispatch(clearError());
		}
    }, [isSuccess, isError])

	
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo({
			name,
			email,
			phoneNumber,
		}));
	}

	return (
	<>
		<div className="flex justify-center w-full pb-10 pr-5">
			<FaUserCircle size={80} color='rgb(120 113 108)'/>
		</div>
		
		<div className="w-full">
			<form onSubmit={handleSubmit} aria-required={true}>			
				<div className="w-full max-w-[600px] flex flex-col gap-6 mx-auto">
					<div className="w-full pr-3">
						<label className="block pb-2">Full Name</label>
						<div className="normalFlex gap-2">
							<input type="text" className='input' required value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditName} />
							<CiEdit size={26} className="cursor-pointer" onClick={() => setIsEditName(prev => !prev)}/>
						</div>
					</div>
					<div className="w-full pr-3">
						<label className="block pb-2">Email Address</label>
						<div className="normalFlex gap-2">
							<input type="email" className='input' required value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditEmail} />
							<CiEdit size={26} className="cursor-pointer" onClick={() => setIsEditEmail(prev => !prev)}/>
						</div>
					</div>
					<div className="w-full pr-3">
						<label className="block pb-2">Phone Number</label>
						<div className="normalFlex gap-2">
							<input type="tel" className='input' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isEditPhone} />
							<CiEdit size={26} className="cursor-pointer" onClick={() => setIsEditPhone(prev => !prev)}/>
						</div>
					</div> 
					<div className="w-full mt-8 text-right">
						<button type="submit"  disabled={!isEditName && !isEditEmail && !isEditPhone}
							className="bg-[green] text-[white] w-[200px] h-[40px] border text-center rounded-[3px] disabled:bg-[#cccccc]">
							Update
						</button>
					</div>
				</div>
			</form>
		</div>
	</>
	);
};

export default ProfilePage