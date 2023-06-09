import React from 'react'

const CustomInput = ({label, type, id, name, value, setValue}) => {
  return (
    <div>
        <label htmlFor="email" className="block text-[15px] font-medium text-gray-700">
            {label}
        </label>
        <input type={type} id={id} name={name} autoComplete={name} required value={value} onChange={(e) => setValue(e.target.value)} 
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
    </div>
  )
}

export default CustomInput