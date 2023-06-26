import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header/Header2';
import Footer from '../components/Layout/Footer';
import OrderDetails from '../components/Profile/OrderDetails';
import Loader from '../components/Layout/Loader';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAllOrders, selectUserOrdersLoading } from '../redux/features/orderSlice';

const SingleOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const userAllOrders = useSelector(selectUserAllOrders);
    const userOrdersLoading = useSelector(selectUserOrdersLoading);

    useEffect(() => {
        if(!userOrdersLoading) {
            const o = userAllOrders?.find(item => item._id === id);
            setOrder(o);
            window.scrollTo(0,0);
        }
    }, [userOrdersLoading, id])


    return (
    <>
        <div>
            <Header />
            {userOrdersLoading && <Loader />}
            {!userOrdersLoading && <OrderDetails data={order} />}
            <Footer />
        </div>
    </>
    )
}

export default SingleOrder