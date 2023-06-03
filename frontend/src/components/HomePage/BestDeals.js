import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { productData } from "../../static/data";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../redux/features/productsSlice";

const BestDeals = () => {
  const [data, setData] = useState([]);
  // const allProducts = useSelector(state => state.products.allProducts);
  const allProducts = useSelector(selectAllProducts);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const d = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);
    const firstFive = d.slice(0, 5);
    setData(firstFive);
  }, []);
  

  return (
    <div>
        <div className='section'>
            <div className='heading'>
                <h1>Best Deals</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            { data && data.length !== 0 && 
                <>
                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                </>
            }
            </div>
        </div>
    </div>
  );
};

export default BestDeals;