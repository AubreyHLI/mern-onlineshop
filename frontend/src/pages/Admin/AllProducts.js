import React, { useEffect, useState }  from "react";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useOutletContext } from "react-router-dom";
// import { deleteProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectAllProducts } from "../../redux/features/productsSlice";
import { MdAdd } from "react-icons/md";
import { BACKEND_URL } from "../../static/server";
import NewProductForm from "../../components/Admin/NewProductForm";
import DeleteConfirm from "../../components/Admin/DeleteConfirm";


const AllProducts = () => {
    const allProducts = useSelector(selectAllProducts);
    const [productId, setProductId] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    
	const dispatch = useDispatch();
    const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(4);
        dispatch(fetchAllProducts());
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
        { field: "id", headerName: "Product ID", minWidth: 120, flex: 0.2 },
        { field: "name", headerName: "Name", minWidth: 120, flex: 0.2, },
        { field: "image", headerName: "Image", minWidth: 80, flex: 0.1, sortable: false, renderCell: (params) => 
            <img src={`${BACKEND_URL}${params.value}`}  alt="" className="w-[40px] h-[40px]" />
        },
        { field: "price", headerName: "Price", minWidth: 100, flex: 0.1, },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 60, flex: 0.1, },
        { field: "sold", headerName: "Sold out", type: "number", minWidth: 60, flex: 0.1, },
        { field: "Preview", headerName: "Preview", flex: 0.1, minWidth: 60, type: "number", sortable: false, renderCell: (params) => 
            <Link to={`/product/${params.id}`}>
                <Button>
                    <AiOutlineEye size={20} />
                </Button>
            </Link>
        },
        { field: " ", flex: 0.1, minWidth: 60, headerName: "Delete", type: "number", sortable: false, renderCell: (params) => 
            <Button onClick={() => setProductId(params.id) || setOpenDelete(true)}>
                <AiOutlineDelete size={20} />
            </Button>
        },
    ];

    const gridRows = [];

    allProducts && allProducts.forEach((item) => {
        gridRows.push({
            id: item._id,
            name: item.name,
            image: item.images[0],
            price: `US$ ${item.discountPrice ? item.discountPrice : item.originalPrice}`,
            stock: item?.stock,
            sold: item?.sold_out,
        });
    });


    return (
    <>
        <div className="w-full mt-4 px-1 normalFlex justify-between">
            <h1 className="text-[22px] 800px:text-[26px]">All Products</h1>
            <button className="p-2 rounded-lg text-white bg-indigo-500 normalFlex gap-1" onClick={() => setOpenAddForm(true)}>
                <MdAdd size={24}/>
                <span className="hidden 500px:inline-block mr-2">Create New Product</span>
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

        {openAddForm && <NewProductForm setOpenAddForm={setOpenAddForm}/>}

        {openDelete && <DeleteConfirm handleDelete={handleDelete} itemId={productId} setOpenDelete={setOpenDelete} itemName='product'/>}
    </>
    );
};

export default AllProducts;