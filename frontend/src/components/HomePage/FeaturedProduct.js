import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../redux/features/productsSlice";
import ProductCard from "../Products/ProductCard";

const FeaturedProduct = () => {
  // const allProducts = useSelector(state => state.products.allProducts);
  const allProducts = useSelector(selectAllProducts);
   
  return (
    <div>
      <div className='section'>
        <div className='heading'>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            { allProducts && allProducts.length !== 0 && (
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;