import React, { useState } from 'react'
import Header from './Header/Header2';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../Profile/ProfileSidebar';

const ProfileCommontLayout = () => {
    const [active, setActive] = useState(0);

    return (
        <div className='w-full'>
            <Header />
            <div className="section flex items-start justify-between w-full py-8">
                <div className="w-[80px] lg:w-[300px] sticky pb-2">
                    <ProfileSidebar active={active} />
                </div>
                <div className='w-[calc(100%-80px)] lg:w-[calc(100%-300px)] px-8 h-full overflow-y-scroll'>
                    <Outlet context={{setActive}} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProfileCommontLayout