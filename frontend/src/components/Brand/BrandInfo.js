import React from "react";
import { BACKEND_URL } from "../../static/server";


const BrandInfo = ({brandData, brandProducts}) => {    
    return (
        <div>
            <div className="w-full pt-5 pb-3">
                <div className="w-full flex item-center justify-center">
                    <img src={`${BACKEND_URL}${brandData?.avatar}`} alt=""
                        className="w-[150px] h-[150px] object-cover rounded-full"
                    />
                </div>
                <h3 className="text-center py-2 text-[20px]">{brandData?.name}</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                    {brandData?.description}
                </p>
            </div>
            <div className="p-3 flex gap-3 800px:flex-col 800px:gap-0">
                <h5 className="font-[600]">Total Products:</h5>
                <h4 className="text-[#000000a6]">{brandProducts && brandProducts?.length}</h4>
            </div>
            <div className="p-3 flex gap-3 800px:flex-col 800px:gap-0">
                <h5 className="font-[600]">Joined On:</h5>
                <h4 className="text-[#000000b0]">{brandData?.createdAt?.slice(0,10)}</h4>
            </div>          
        </div>
    );
};

export default BrandInfo;