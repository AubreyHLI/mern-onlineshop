import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link, useOutletContext } from "react-router-dom";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, selectAllOrders } from "../../redux/features/orderSlice";
import { selectAllBrands } from "../../redux/features/brandsSlice";
import { fetchAllBrands } from "../../redux/features/brandsSlice";
import { TbBrandSlack } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";


const AdminDashboard = () => {
	const allOrders = useSelector(selectAllOrders);
	const brands = useSelector(selectAllBrands);
	const {setActive} = useOutletContext();

	const dispatch = useDispatch();

	useEffect(() => {
		setActive(0);
		dispatch(fetchAllOrders());
		dispatch(fetchAllBrands());
	}, [])

	const adminEarning = allOrders && allOrders.reduce((acc,item) => acc + item.priceSummary.totalPrice * .30, 0);
	const adminBalance = adminEarning?.toFixed(2);

	const gridColumns = [
		{ field: "id", headerName: "Order ID", minWidth: 100, flex: 0.2 },
		{ field: "status", headerName: "Status", minWidth: 120, flex: 0.2, renderCell: (params) => {
			return params.value === "Delivered"
			? <span className="text-[green]">{params.value}</span>
			: <span className="text-[red]">{params.value}</span>;
		}},
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

	allOrders && allOrders.forEach((item) => {
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
		<div className="w-full p-4">
			<h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
			<div className="w-full block 800px:flex items-center justify-between">
				<div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
					<div className="flex items-center text-[#606060]">
						<AiOutlineMoneyCollect size={30} className="mr-2" />
						<h3 className='productTitle !text-[18px] leading-5 !font-[400] '>
							Total Earning
						</h3>
					</div>
					<h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$ {adminBalance}</h5>
				</div>
		
				<div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
					<div className="flex items-center text-[#606060]">
						<TbBrandSlack size={30} className="mr-2" />
						<h3 className='productTitle !text-[18px] leading-5 !font-[400]'>
							All Brands
						</h3>
					</div>
					<h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{brands?.length}</h5>
					<Link to="/admin/allBrands">
						<h5 className="pt-4 pl-2 text-[#077f9c]">View Brands</h5>
					</Link>
				</div>
		
				<div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
					<div className="flex items-center text-[#606060]">
						<FiPackage size={30} className="mr-2"/>
						<h3 className='productTitle !text-[18px] leading-5 !font-[400] '>
							All Orders
						</h3>
					</div>
					<h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allOrders && allOrders.length}</h5>
					<Link to="/admin/allOrders">
						<h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
					</Link>
				</div>
			</div>
	
			<br />
			<h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
			<div className="w-full min-h-[45vh] bg-white rounded">
				<DataGrid
					rows={gridRows}
					columns={gridColumns}
					pageSize={4}
					disableSelectionOnClick
					autoHeight
				/>
			</div>
		</div>
		{/* )
		} */}
	</>
	);
};

export default AdminDashboard;