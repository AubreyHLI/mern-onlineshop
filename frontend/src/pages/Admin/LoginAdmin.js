import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginAdmin, clearSuccess } from "../../redux/features/userSlice";

const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const { isSuccess, isError, error } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            toast.success(`Login admin successfully!`);
            dispatch(clearSuccess());
            navigate('/admin');
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isSuccess, isError])
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginAdmin({email: email, password: password}))
    };
  
    return (
    <div className="min-h-100 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login the admin account
            </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input type={visible ? "text" : "password"} name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                    { visible 
                    ? <AiOutlineEye className="absolute right-2 top-8 cursor-pointer" size={25} onClick={() => setVisible(false)}/>
                    : <AiOutlineEyeInvisible className="absolute right-2 top-8 cursor-pointer" size={25} onClick={() => setVisible(true)}/>
                    }
                </div>
                <div className="normalFlex justify-between">
                    <span className="text-sm">
                        <a href=".forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                    </span>
                </div>
                <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> 
                    Login
                </button>
            </form>
        </div>
    </div>
    );
}

export default LoginAdmin;