import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllOrders } from '../../redux/features/orderSlice';
import AdminOrderDetails from '../../components/Admin/AdminOrderDetails';

const AdminSingleOrder = () => {
	const { id } = useParams();
    const [order, setOrder] = useState(null);
    const allOrders = useSelector(selectAllOrders);

    useEffect(() => {
        const o = allOrders?.find(item => item._id === id);
        setOrder(o);
        window.scrollTo(0,0);
    }, [id])


    return (
        <div>
            <AdminOrderDetails data={order} />
        </div>
    )
}

export default AdminSingleOrder