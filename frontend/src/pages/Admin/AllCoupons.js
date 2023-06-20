import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../static/server";
import { toast } from "react-toastify";
import axios from "axios";
import NewCouponForm from "../../components/Admin/NewCouponForm";
import DeleteConfirm from "../../components/Admin/DeleteConfirm";
import { MdAdd } from "react-icons/md";
import { fetchAllCoupons, selectAllCoupons } from "../../redux/features/couponSlice";
import { useOutletContext } from "react-router-dom";

const AllCoupons = () => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [couponId, setCouponId] = useState("");

    const coupons = useSelector(selectAllCoupons);
    const dispatch = useDispatch();
    const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(9);
        dispatch(fetchAllCoupons());
    }, []);

    const handleDelete = async (id) => {
        // axios.delete(`${SERVER_URL}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
        // toast.success("Coupon code deleted succesfully!")
        // })
        // window.location.reload();
    };

    const gridColumns = [
        { field: "id", headerName: "Coupon ID", minWidth: 100, flex: 0.2 },
        { field: "code", headerName: "Coupon Code", minWidth: 120, flex: 0.2, },
        { field: "discount", headerName: "Discount", minWidth: 60, flex: 0.1, },
        { field: "Delete", flex: 0.1, minWidth: 60, headerName: "Delete", type: "number", sortable: false, renderCell: (params) => 
            <Button onClick={() => setCouponId(params.id) || setOpenDelete(true)}>
                <AiOutlineDelete size={20} />
            </Button>
        },
    ];

    const gridRows = [];

    coupons?.forEach((item) => {
        gridRows.push({
            id: item._id,
            code: item.code,
            discount: item.value + " %",
            sold: 10,
        });
    });

    return (
    <>
        <div className="w-full mt-4 px-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Coupon Codes</h1>
            <button className="p-2 rounded-lg text-white bg-yellow-400 normalFlex gap-1" onClick={() => setOpenAddForm(true)}>
                <MdAdd size={24}/>
                <span className="hidden 500px:inline-block mr-2">Create New Coupon</span>
            </button>
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

        {openAddForm && <NewCouponForm setOpenAddForm={setOpenAddForm}/>}

        {openDelete && <DeleteConfirm handleDelete={handleDelete} itemId={couponId} setOpenDelete={setOpenDelete} itemName='coupon'/>}
    </>
    );
};

export default AllCoupons;