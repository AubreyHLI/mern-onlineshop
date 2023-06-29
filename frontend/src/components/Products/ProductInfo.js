import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import { BACKEND_URL } from '../../static/server';
import { useSelector } from 'react-redux';
import { selectProductsByBrand } from '../../redux/features/productsSlice';
import { Avatar } from '@mui/material';
import { getIsLoadingBrands, selectAllBrands } from '../../redux/features/brandsSlice';


const ProductInfo = ({data}) => {
    const id = data.brandId;
    const [active, setActive] = useState(1);
    const [brand, setBrand] = useState(null);
    const allBrands = useSelector(selectAllBrands);
    const isLoading = useSelector(getIsLoadingBrands);
    const brandProducts = useSelector(state => selectProductsByBrand(state, id));

    useEffect(() => {
        if(!isLoading) {
            console.log('allbrands:', allBrands)
            const b = allBrands?.find(item => item._id === id);
            setBrand(b);
        }
    },[isLoading, id])

    return (
    <div className="bg-[#fff] px-3 800px:px-10 py-2 rounded">
        <div className="w-full flex justify-between border-b pb-4 pt-5">
            <div className="relative">
                <h5 onClick={() => setActive(1)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] pb-1"}>
                    Product Details
                </h5>
                { active === 1 ? <div className='active_indicator' /> : null }
            </div>
            <div className="relative">
                <h5 onClick={() => setActive(2)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                    Product Reviews <span> ( {data?.reviews?.length} ) </span>
                </h5>
                { active === 2 ? <div className='active_indicator' /> : null }
            </div>
            <div className="relative">
                <h5 onClick={() => setActive(3)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                    Brand Information
                </h5>
                { active === 3 ? <div className='active_indicator' /> : null }
            </div>
        </div>

        {active === 1 ? (
        <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                { data.description }
            </p>
        </>
        ) : null}

        {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            { data?.reviews?.map((item, index) => (
                <div className="w-full normalFlex my-2" key={index}>
                    <Avatar size={50}>{item.user.name.slice(0,1)}</Avatar>
                    <div className="pl-2 ">
                        <div className="w-full flex items-center">
                            <h1 className="font-[500] mr-3">{item.user.name}</h1>
                            <Ratings ratings={data?.ratings} />
                        </div>
                        <p>{item.comment}</p>
                    </div>
                </div>
            ))}

            <div className="w-full flex justify-center">
                { data?.reviews?.length === 0 && (
                    <h5>No Reviews have for this product!</h5>
                )}
            </div>
        </div>
        ) : null}

        {active === 3 && !isLoading &&
        <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
                <Link to={`/brand/${data.brand._id}`}>
                    <div className="flex items-center">
                        <img src={`${BACKEND_URL}${data?.brand?.avatar}`} alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
                        <div className="pr-8">
                            <h3 className='shop_name'>{data?.brand?.name}</h3>
                        </div>
                    </div>
                </Link>
                <p className="pt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus id voluptas et nisi! Minus aliquid officia voluptatem quo autem odit quae dolore, quam magnam quod porro, ipsam, itaque accusamus eaque?
                </p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-2 800px:flex flex-col items-end">
                <div className="text-left">
                    <h5 className="font-[600]">
                        Joined on:{" "}
                        <span className="font-[500]">{brand?.createdAt?.slice(0, 10)}</span>
                    </h5>
                    <h5 className="font-[600] pt-3">
                        Total Products:{" "}
                        <span className="font-[500]">{brandProducts?.length}</span>
                    </h5>
                    <Link to={`/brand/${data.brand._id}`}>
                        <div className='button !rounded-[4px] !h-[39.5px] !mt-5' >
                            <h4 className="text-white">Visit Brand</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        }
    </div>
    );
}

export default ProductInfo