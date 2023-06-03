import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import NewBrandForm from "../../components/Admin/NewBrandForm";
import DeleteConfirm from "../../components/Admin/DeleteConfirm";
import { fetchAllUsers } from "../../redux/features/userSlice";


const AllUsers = () => {
    const { users } = useSelector((state) => state.user);
    const [userId, setUserId] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [])


    const handleDelete = async (id) => {
        // await axios
        // .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
        // .then((res) => {
        // toast.success(res.data.message);
        // });

        // dispatch(getAllUsers());
    };

    const gridColumns = [
        { field: "id", headerName: "User ID", minWidth: 120, flex: 0.2 },
        { field: "name", headerName: "Name", minWidth: 120, flex: 0.2, },
        { field: "email", headerName: "Email", type: "text", minWidth: 120, flex: 0.2, },
        { field: "joinedAt", headerName: "JoinedAt", type: "text", minWidth: 80, flex: 0.1, },
        { field: " ", flex: 0.1, minWidth: 80, headerName: "Delete User", type: "number", sortable: false, renderCell: (params) => {
            return (
                <Button onClick={() => setUserId(params.id) || setOpenDelete(true)}>
                    <AiOutlineDelete size={20} />
                </Button>
            );
        }},
    ];  

    const gridRows = [];

    users && users.forEach((item) => {
        gridRows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            joinedAt: item.createdAt.slice(0, 10),
        });
    });

   
    return (
    <>
        <div className="w-full mt-4 px-1 normalFlex">
            <h1 className="text-[22px] 800px:text-[26px]">All Users</h1>
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

        {openDelete && <DeleteConfirm handleDelete={handleDelete} itemId={userId} setOpenDelete={setOpenDelete} itemName='user'/>}

    </>
    )
};

export default AllUsers;