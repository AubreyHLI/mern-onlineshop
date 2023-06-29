import React, { useState } from "react";
import ProductCard from "../Products/ProductCard";


const BrandProducts = ({brandProducts}) => {
    const [active, setActive] = useState(1);
    // const { events } = useSelector((state) => state.events);


    return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <div className="w-full flex">
                <div className="flex items-center" onClick={() => setActive(1)}>
                    <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
                        Brand Products
                    </h5>
                </div>

                <div className="flex items-center" onClick={() => setActive(2)}>
                    <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`} >
                        Running Events
                    </h5>
                </div>
            </div>
        </div>

        <br />
        {active === 1 && (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                {brandProducts && brandProducts.map((i, index) => (
                    <ProductCard data={i} key={index} isBrandPage={true} />
                ))}
            </div>
        )}

        {active === 2 && (
            <div className="w-full">
                {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                    {events && events.map((i, index) => (
                        <ProductCard
                            data={i}
                            key={index}
                            isEvent={true}
                        />
                    ))} 
                </div> */}
                {/* {events && events.length === 0 && ( */}
                <h5 className="w-full text-center py-5 text-[18px]">
                    No Events have for this brand!
                </h5>
                {/* )} */}
            </div>
        )}

    </div>
    );
};

export default BrandProducts;