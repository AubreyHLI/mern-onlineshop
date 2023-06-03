import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchAllBrands, selectAllBrands } from "../../redux/features/brandsSlice";
import { MdAdd } from "react-icons/md";
import { BACKEND_URL } from "../../static/server";
import NewBrandForm from "../../components/Admin/NewBrandForm";
import DeleteConfirm from "../../components/Admin/DeleteConfirm";

const AllBrands = () => {
    const allBrands = useSelector(selectAllBrands);
    const [brandId, setBrandId] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBrands());
    }, [])

    const handleDelete = async (id) => {
    //     await axios
    //     .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
    //     .then((res) => {
    //     toast.success(res.data.message);
    //     });

    //     dispatch(getAllSellers());
     };

    const gridColumns = [
        { field: "id", headerName: "Brand ID", minWidth: 120, flex: 0.2 },
        { field: "name", headerName: "Brand Name", minWidth: 120, flex: 0.2, },
        { field: "avatar", headerName: "Avatar", minWidth: 80, flex: 0.1, sortable: false, renderCell: (params) => 
            <img src={`${BACKEND_URL}${params.value}`}  alt="" className="w-[38px] h-[38px]" />
        },
        { field: "joinedAt", headerName: "JoinedAt", type: "text", minWidth: 120, flex: 0.2, },
        { field: "  ", flex: 0.1, minWidth: 80, headerName: "Preview Brand", type: "number", sortable: false, renderCell: (params) => 
            <Link to={`/brand/${params.id}`}>
                <Button>
                    <AiOutlineEye size={20} />
                </Button>
            </Link>
        },
        { field: " ", flex: 0.1, minWidth: 80, headerName: "Delete Brand", type: "number", sortable: false, renderCell: (params) => 
            <Button onClick={() => setBrandId(params.id) || setOpenDelete(true)}>
                <AiOutlineDelete size={20} />
            </Button>
        },
    ];

    const gridRows = [];

    allBrands && allBrands.forEach((item) => {
        gridRows.push({
            id: item._id,
            name: item?.name,
            joinedAt: item?.createdAt?.slice(0, 10),
            avatar: item?.avatar,
        });
    });

    return (
    <>
        <div className="w-full mt-4 px-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Brands</h1>
            <button className="p-2 rounded-lg text-white bg-pink-400 normalFlex gap-1" onClick={() => setOpenAddForm(true)}>
                <MdAdd size={24}/>
                <span className="hidden 500px:inline-block mr-2">Create New Brand</span>
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

        {openAddForm && <NewBrandForm setOpenAddForm={setOpenAddForm} />}

        {openDelete && <DeleteConfirm handleDelete={handleDelete} itemId={brandId} setOpenDelete={setOpenDelete} itemName='brand'/>}
    </>
    )
};

export default AllBrands;

