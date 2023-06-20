import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import NewEventForm from '../../components/Admin/NewEventForm'
import { fetchAllEvents, selectAllEvents } from '../../redux/features/eventsSlice';
import { MdAdd } from 'react-icons/md';
import DeleteConfirm from '../../components/Admin/DeleteConfirm';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link, useOutletContext } from 'react-router-dom';


const AllEvents = () => {
    const allEvents = useSelector(selectAllEvents);
    const [eventId, setEventId] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    const dispatch = useDispatch();
    const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(5);
        dispatch(fetchAllEvents());
    }, [])

    const handleDelete = (id) => {
        // dispatch(deleteEvent(id));
        // window.location.reload();
    }
    
    const gridColumns = [
        { field: "id", headerName: "Event ID", minWidth: 100, flex: 0.1 },
        { field: "product_name",  headerName: "Product Name",  minWidth: 120,  flex: 0.2,},
        { field: "original_price",  headerName: "Original Price",  minWidth: 80,  flex: 0.1,},
        { field: "discount_price",  headerName: "Discount Price",  minWidth: 80,  flex: 0.1,},
        { field: "stock",  headerName: "Stock",  type: "number",  minWidth: 80,  flex: 0.1,},
        { field: "status",  headerName: "Status",  minWidth: 80,  flex: 0.1,},
        { field: "start_date",  headerName: "Start Date",  minWidth: 120,  flex: 0.2,},
        { field: "finish_date",  headerName: "Finish Date",  minWidth: 120,  flex: 0.2,},
        { field: "product_id",  flex: 0.1,  minWidth: 60,  headerName: "Preview",  type: "number",  sortable: false,  renderCell: (params) => 
                <Link to={`/product/${params.value}`}>
                    <Button>
                        <AiOutlineEye size={20} />
                    </Button>
                </Link>
        },
        { field: "Delete", flex: 0.1, minWidth: 60, headerName: "Delete", type: "number", sortable: false, renderCell: (params) => 
                <Button onClick={() => setEventId(params.id) || setOpenDelete(true)}>
                    <AiOutlineDelete size={20} />
                </Button>
        },
    ];
    
    const gridRows = [];
    
    allEvents && allEvents.forEach((item) => {
        gridRows.push({
            id: item._id,
            product_id: item.productId,
            product_name: item.product.name,
            original_price: "US$ " + item.product.originalPrice,
            discount_price: "US$ " + item.discountPrice,
            stock: item.product.stock,
            status: item.status,
            start_date: item.start_Date.slice(0,10),
            finish_date: item.finish_Date.slice(0,10),
        });
    });


    return (
    <>
        <div className="w-full mt-4 px-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Events</h1>
            <button className="p-2 rounded-lg text-white bg-pink-400 normalFlex gap-1" onClick={() => setOpenAddForm(true)}>
                <MdAdd size={24}/>
                <span className="hidden 500px:inline-block mr-2">Create New Event</span>
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

        {openAddForm && <NewEventForm setOpenAddForm={setOpenAddForm} />}

        {openDelete && <DeleteConfirm handleDelete={handleDelete} itemId={eventId} setOpenDelete={setOpenDelete} itemName='event'/>}
    </>
    )
};

export default AllEvents