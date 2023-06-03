import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const AllOrders = () => {
  const orders = [
    {
      _id: "mnhukijhyt6754371628",
      orderItems: [
        {
          name: 'iphone 14 pro max'
        }
      ],
      totalPrice: 120,
      orderStatus: "Processing"
    },
  ];

  const gridColumns = [
    { field: "id", headerName: "Order ID",  flex: 0.2, },

    { field: "status", headerName: "Status", flex: 0.1,},

    { field: "itemsQty", headerName: "Items Qty", type: "number", flex: 0.1, },

    { field: "total", headerName: "Total", type: "number", flex: 0.2, },

    { field: " ", flex: 0.1, headerName: "", type: "number", sortable: false, renderCell: (params) => 
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
    },
  ];

  const gridRows = [];

  orders && orders.forEach(item => {
    gridRows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice,
      status: item.orderStatus,
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

export default AllOrders