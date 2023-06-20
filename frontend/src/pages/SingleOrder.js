import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header/Header2';
import Footer from '../components/Layout/Footer';
import OrderDetails from '../components/Profile/OrderDetails';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAllOrders, selectUserOrdersLoading } from '../redux/features/orderSlice';
import { BsBagCheck } from 'react-icons/bs';

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
    }, [userOrdersLoading])


    return (
    <>
        {!userOrdersLoading && 
        <div>
            <Header />
            <OrderDetails data={order} />
            <Footer />
        </div>
        }

    </>
    )
}

export default SingleOrder