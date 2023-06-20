import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PwInput from '../../components/atmos/PwInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPW, clearError, clearSuccess } from '../../redux/features/userSlice';
import { useOutletContext } from 'react-router-dom';

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [visible1, setVisible1] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [visible2, setVisible2] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visible3, setVisible3] = useState(false);

	const {isSuccess, isError, error, success} = useSelector(state => state.user);
	const dispatch = useDispatch();
	const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(5);
		window.scrollTo(0,0);
	},[])

	useEffect(() => {
		if(isSuccess) {
			toast.success(success, {autoClose: 1500});
			dispatch(clearSuccess());
		}
		if(isError) {
			toast.error(error, {autoClose: 2000});
			dispatch(clearError());
		}
	},[isError,isSuccess])


	const passwordChangeHandler = async (e) => {
		e.preventDefault();
		dispatch(updateUserPW({ oldPassword, newPassword, confirmPassword }));
	};

	return (
		<div className="w-full px-5">
			<h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
				Change Password
			</h1>
			<div className="w-full">
				<form	onSubmit={passwordChangeHandler} className="flex flex-col items-center" >
					<div className=" w-[100%] max-w-[600px] mt-5">
						<PwInput label='Enter your old password' name='oldPw' id='oldPw'
							password={oldPassword} setPassword={setOldPassword}
							visible={visible1} setVisible={setVisible1}
						/>
					</div>
					<div className=" w-[100%] max-w-[600px] mt-3">
						<PwInput label='Enter your new password' name='newPw' id='newPw'
							password={newPassword} setPassword={setNewPassword}
							visible={visible2} setVisible={setVisible2}
						/>
					</div>
					<div className=" w-[100%] max-w-[600px] mt-3">
						<PwInput label='Confirm your new password' name='confirmPw' id='confirmPw'
							password={confirmPassword} setPassword={setConfirmPassword}
							visible={visible3} setVisible={setVisible3}
						/>
					</div>
					
					<div className=" w-[100%] 800px:w-[60%] mt-3">
						<input
							className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
							required
							value="Update"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ChangePassword