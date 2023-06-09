import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const PwInput = ({label, name, id, password, setPassword, visible, setVisible}) => {
  return (
    <div className="relative">
        <label htmlFor={id} className="block text-[15px] font-medium text-gray-700">
            {label}
        </label>
        <input type={visible ? "text" : "password"} id={id} name={name} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        { visible 
        ? <AiOutlineEye className="absolute right-2 top-[33px] cursor-pointer" size={25} onClick={() => setVisible(false)}/>
        : <AiOutlineEyeInvisible className="absolute right-2 top-[33px] cursor-pointer" size={25} onClick={() => setVisible(true)}/>
        }
    </div>
  )
}

export default PwInput