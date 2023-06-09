import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../static/server";
import axios from "axios";
import { toast } from 'react-toastify';
import PwInput from "../components/atmos/PwInput";
import CustomInput from "../components/atmos/CustomInput";

const Singup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${SERVER_URL}/users/signup`, {
                name: name,
                email: email,
                password: password
            });
            toast.success(response.data.message);
            resetInputs();  
        } catch(err){
            toast.error(err.response?.data.message);
        };
    };

    const resetInputs = () => {
        setEmail("");
        setName("");
        setPassword("");
        setVisible(false);
    }

    return (
    <div className='w-full h-screen bg-gray-50'>
        <div className="min-h-[300px] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create a new account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <CustomInput 
                        label='Full Name' type='text' id='name' name='name'
                        value={name} setValue={setName}
                    />
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
                    <div>
                        <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Sign up
                        </button>
                    </div>
                    <div className="normalFlex w-full">
                        <h4>Already have an account?</h4>
                        <Link to="/login" className="text-blue-600 pl-2">
                            Log in
                        </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Singup;