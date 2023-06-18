import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import { fetchUserOrders, selectUserAllOrders } from '../../redux/features/orderSlice';

const UserAllOrders = () => {
	const orders = useSelector(selectUserAllOrders);

	const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserOrders());
    }, [])

	const gridColumns = [
		{ field: "id", headerName: "Order ID", minWidth: 100, flex: 0.2, },
		{ field: "status", headerName: "Status", minWidth: 100, flex: 0.2,},
		{ field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 60, flex: 0.1, },
		{ field: "total", headerName: "Total", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "createdAt", headerName: "Order Date", type: "number", minWidth: 100, flex: 0.2, },
		{ field: " ",  headerName: "Details", type: "number", minWidth: 80, flex: 0.1, sortable: false, renderCell: (params) => 
			<Link to={`/order/${params.id}`}>
				<Button>
					<AiOutlineArrowRight size={20} />
				</Button>
			</Link>
		},
	];

	const gridRows = [];

	orders && orders.forEach(ord => {
		gridRows.push({
			id: ord._id,
			itemsQty: ord.cart.reduce((total, item) => total + item.qty, 0),
			total: "US$ " + ord.priceSummary.totalPrice.toFixed(2),
			status: ord.status,
			createdAt: ord?.createdAt.slice(0,10),
		});
	});

	return (
	<>
		 <div className="w-full pl-2 pt-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Orders</h1>
        </div>
        <div className="w-full my-4">
            <DataGrid
				rows={gridRows}
				columns={gridColumns}
				pageSize={10}
				disableSelectionOnClick
				autoHeight
            />
        </div>
	</>
	)
}

export default UserAllOrders