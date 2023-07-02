import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearSuccess, fetchUser, loginUser } from "../redux/features/userSlice";
import PwInput from "../components/atmos/PwInput";
import CustomInput from "../components/atmos/CustomInput";
import { fetchCartItems } from "../redux/features/shoppingcartSlice";
import { fetchWishlist } from "../redux/features/wishlistSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const { isSuccess, success, isError, error } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            toast.success(success);
            dispatch(clearSuccess());
            // dispatch(fetchUser());
            // dispatch(fetchCartItems());
		    // dispatch(fetchWishlist());
           
            navigate('/');
        }
        if(isError) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isSuccess, isError])
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({email: email, password: password}));
    };
  
    return (
    <div className='w-full h-screen bg-gray-50'>
        <div className="min-h-[300px] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" onSubmit={handleSubmit}>
                    <CustomInput 
                        label='Email' type='email' id='email' name='email'
                        value={email} setValue={setEmail}
                    />
                    <PwInput 
                        label='Password' id='password' name='password'
                        password={password} 
                        setPassword={setPassword}  
                        visible={visible} 
                        setVisible={setVisible} 
                    />
                    <div className="normalFlex justify-between">
                        <span className="text-sm">
                            <a href=".forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                        </span>
                    </div>
                    <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> 
                        Login
                    </button>
                    <div className="normalFlex w-full">
                        <h4>Not have any account?</h4>
                        <Link to="/signup" className="text-blue-600 pl-2">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Login;