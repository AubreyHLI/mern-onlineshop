import React, { useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, selectUserAllOrders } from '../../redux/features/orderSlice';

const AllRefundOrders = () => {
	const orders = useSelector(selectUserAllOrders);

	const dispatch = useDispatch();
	const {setActive} = useOutletContext();

    useEffect(() => {
		setActive(2);
        window.scrollTo(0,0);
		dispatch(fetchUserOrders());
    }, [])

	const refundOrders = orders?.filter(order => order.status === "Processing refund" || order.status === "Refund Success" );

	const gridColumns = [
		{ field: "id", headerName: "Order ID", minWidth: 100, flex: 0.2, },
		{ field: "status", headerName: "Status", minWidth: 100, flex: 0.2,},
		{ field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 60, flex: 0.1, },
		{ field: "total", headerName: "Total", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "createdAt", headerName: "Order Date", type: "number", minWidth: 100, flex: 0.2, },
		{ field: " ",  headerName: "Details", type: "number", minWidth: 80, flex: 0.1, sortable: false, renderCell: (params) => 
			<Link to={`/order/${params.id}`}>
				<IconButton color="primary">
					<AiOutlineArrowRight size={20} />
				</IconButton>
			</Link>
		},
	];

	const gridRows = [];

	refundOrders?.forEach(ord => {
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
		<div className="w-full pl-2 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">Refund Orders</h1>
        </div>
        <div className="w-full my-4">
            <DataGrid
				rows={gridRows}
				columns={gridColumns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10, 25]}
				disableSelectionOnClick
				autoHeight
            />
        </div>
	</>
	)
}

export default AllRefundOrders