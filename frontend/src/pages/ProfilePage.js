import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Layout/Header/Header2';
import AddressBook from '../components/ProfilePage/AddressBook';
import UserAllOrders from '../components/ProfilePage/UserAllOrders';
import AllRefundOrders from '../components/ProfilePage/AllRefundOrders';
import ChangePassword from '../components/ProfilePage/ChangePassword';
import Inbox from '../components/ProfilePage/Inbox';
import ProfileContent from '../components/ProfilePage/ProfileContent'
import ProfileSidebar from '../components/ProfilePage/ProfileSidebar'
import TrackOrder from '../components/ProfilePage/TrackOrder';
import { fetchUserOrders } from '../redux/features/orderSlice';

const ProfilePage = () => {
    const user = useSelector(state => state.user.user);
    const [active, setActive] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [])
    
    return (
        <div>
            <Header />
            { user &&
            <div className='section flex py-10'>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-4">
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <div className="w-full pl-5">
                    {active === 1 && <ProfileContent />}
                    {active === 2 && <UserAllOrders />}
                    {active === 3 && <AllRefundOrders />}
                    {active === 4 && <Inbox />}
                    {active === 5 && <TrackOrder />}
                    {active === 6 && <ChangePassword/>}
                    {active === 7 && <AddressBook />}
                </div>
            </div>
            }
        </div>
    )
}

export default ProfilePage