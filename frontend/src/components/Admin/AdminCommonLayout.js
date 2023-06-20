import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminCommonLayout = () => {
    const [active, setActive] = useState(0);

    return (
        <div className='flex flex-col w-full h-screen'>
            <AdminHeader active={active}/>
            <div className="flex items-start justify-between w-full h-[calc(100%-80px)]">
                <AdminSidebar active={active}/>
                <div className='w-[calc(100%-70px)] 800px:w-[calc(100%-240px)] px-2 800px:px-8 h-full overflow-y-scroll'>
                    <Outlet context={{setActive}} />
                </div>
            </div>
        </div>
    )
}

export default AdminCommonLayout