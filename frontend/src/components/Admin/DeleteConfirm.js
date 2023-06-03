import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const DeleteConfirm = ({setOpenDelete, handleDelete, itemId, itemName}) => {
    return (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                    <RxCross1 size={25} onClick={() => setOpenDelete(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                    Are you sure you wanna delete this {itemName}?
                </h3>
                <div className="w-full flex items-center justify-center">
                    <div className='button text-white text-[18px] !h-[42px] mr-4' onClick={() => setOpenDelete(false)}>
                        cancel
                    </div>
                    <div className='button text-white text-[18px] !h-[42px] ml-4' onClick={() => setOpenDelete(false) || handleDelete(itemId)}>
                        confirm
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm