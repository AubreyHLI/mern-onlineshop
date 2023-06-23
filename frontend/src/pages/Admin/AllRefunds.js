import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';
import { fetchAllOrders, selectAllOrders } from '../../redux/features/orderSlice';
import { Button } from '@mui/material';
import { AiOutlineEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';

const AllRefunds = () => {
	const allOrders = useSelector(selectAllOrders);
	const dispatch = useDispatch();
	const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(6);
		dispatch(fetchAllOrders());
	}, []);

	const refundOrders = allOrders?.filter(order => order.status === "Processing refund" || order.status === "Refund Success" );

	 const gridColumns = [
	 	{ field: "id", headerName: "Order ID", minWidth: 80, flex: 0.2 },
		{ field: "status", headerName: "Status", minWidth: 100, flex: 0.2, },
		{ field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 80, flex: 0.1, },
		{ field: "total", headerName: "Total", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "createdAt", headerName: "Order Date", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "preview", headerName: "Preview", flex: 0.1, minWidth: 80, type: "number", sortable: false, renderCell: (params) => 
			<Link to={`/admin/order/${params.id}`}>
				<Button>
					<AiOutlineEye size={20} />
				</Button>
			</Link>
		},
	 ];

	const gridRows = [];

	refundOrders && refundOrders.forEach((item) => {
	 	gridRows.push({
	 		id: item._id,
			itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
			total: item?.priceSummary?.totalPrice + " $",
			status: item?.status,
			createdAt: item?.createdAt.slice(0,10),
		});
	});


	return (
	<>
		 <div className="w-full mt-4 px-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">Refund Orders</h1>
        </div>
        <div className="w-full my-4 bg-white">
            <DataGrid
				rows={gridRows}
				columns={gridColumns}
				pageSize={10}
				disableSelectionOnClick
				autoHeight
            />
        </div>
	</>
	);
}

export default AllRefunds