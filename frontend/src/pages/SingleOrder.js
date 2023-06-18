import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header/Header2';
import Footer from '../components/Layout/Footer';
import OrderDetails from '../components/Profile/OrderDetails';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAllOrders } from '../redux/features/orderSlice';

const SingleOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const allOrders = useSelector(selectUserAllOrders);

    useEffect(() => {
        const o = allOrders?.find(item => item._id === id);
        setOrder(o);
        window.scrollTo(0,0);
    }, [id])


    return (
        <div>
            <Header />
            <OrderDetails data={order}/>
            <Footer />
        </div>
    )
}

export default SingleOrder