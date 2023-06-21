import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import { fetchUserOrders, selectUserAllOrders } from '../../redux/features/orderSlice';
import { MdTrackChanges } from 'react-icons/md';
import TrackOrderDetails from '../../components/Profile/TrackOrderDetails';

const UserAllOrders = () => {
	const [open, setOpen] = useState(false);
	const [trackOrderId, setTrackOrderId] = useState(null);
	const orders = useSelector(selectUserAllOrders);

	const dispatch = useDispatch();
	const {setActive} = useOutletContext();

    useEffect(() => {
		setActive(1);
        window.scrollTo(0,0);
		dispatch(fetchUserOrders());
    }, [])

	const handleTrack = (id) => {
		setOpen(true);
		setTrackOrderId(id);
		console.log('track order id:', id);
	}

	const gridColumns = [
		{ field: "id", headerName: "Order ID", minWidth: 100, flex: 0.2, },
		{ field: "status", headerName: "Status", minWidth: 100, flex: 0.2,},
		{ field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 60, flex: 0.1, },
		{ field: "total", headerName: "Total", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "createdAt", headerName: "Order Date", type: "number", minWidth: 100, flex: 0.2, },
		{ field: "track",  headerName: "Track", type: "number", minWidth: 80, flex: 0.1, sortable: false, renderCell: (params) => 
			<IconButton color="primary" onClick={() => handleTrack(params.id)}>
				<MdTrackChanges size={20} />
			</IconButton>
		},
		{ field: "details",  headerName: "Details", borderColor:'none', type: "number", minWidth: 80, flex: 0.1, sortable: false,  renderCell: (params) => 
			<Link to={`/order/${params.id}`}>
				<IconButton color="primary">
					<AiOutlineArrowRight size={20} />
				</IconButton>
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
		<div className="w-full pl-2 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Orders</h1>
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

		{open && <TrackOrderDetails open={open} setOpen={setOpen} id={trackOrderId}/>}
	</>
	)
}

export default UserAllOrders