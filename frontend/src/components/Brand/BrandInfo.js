import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../static/server";
import { selectProductsByBrand } from "../../redux/features/productsSlice";


const BrandInfo = ({brandData, brandId}) => {    
    const brandProducts = useSelector(state => selectProductsByBrand(state, brandId));
    
    const totalReviewsLength = brandProducts && brandProducts.reduce((acc, product) => acc + product.reviews.length, 0);

    const totalRatings = brandProducts && brandProducts.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

    const averageRating = totalRatings / totalReviewsLength || 0;

    return (
        <div>
            <div className="w-full py-5">
                <div className="w-full flex item-center justify-center">
                    <img
                        src={`${BACKEND_URL}${brandData?.avatar}`}
                        alt=""
                        className="w-[150px] h-[150px] object-cover rounded-full"
                    />
                </div>
                <h3 className="text-center py-2 text-[20px]">{brandData?.name}</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                    {brandData?.description}
                </p>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Total Products</h5>
                <h4 className="text-[#000000a6]">{brandProducts && brandProducts?.length}</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Shop Ratings</h5>
                <h4 className="text-[#000000b0]">{averageRating}/5</h4>
            </div>          
        </div>
    );
};

export default BrandInfo;