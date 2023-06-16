import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, selectUserAllOrders } from '../../redux/features/orderSlice';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";

const UserAllOrders = () => {
  const orders = useSelector(selectUserAllOrders);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUserOrders());
  }, [])

  const gridColumns = [
    { field: "id", headerName: "Order ID",  flex: 0.2, },
    { field: "status", headerName: "Status", flex: 0.1,},
    { field: "itemsQty", headerName: "Items Qty", type: "number", flex: 0.1, },
    { field: "total", headerName: "Total", type: "number", flex: 0.2, },
    { field: " ", flex: 0.1, headerName: "", type: "number", sortable: false, renderCell: (params) => 
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
    },
  ];

  const gridRows = [];

  orders && orders.forEach(item => {
    console.log('item:', item)
    gridRows.push({
      id: item._id,
      itemsQty: item.cart.length,
      total: "US$ " + item.priceSummary.totalPrice.toFixed(2),
      status: item.status,
    });
  });

  return (
    <div className="pl-2 pt-1">
      <DataGrid
        columns={gridColumns}
        rows={gridRows}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

export default UserAllOrders