import React, { useEffect, useState } from "react";
import Header from '../components/Layout/Header/Header2';
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Products/ProductCard";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/features/productsSlice";
import { getIsLoadingProducts } from "../redux/features/productsSlice";
import Loader from '../components/Layout/Loader';


const Products = () => {
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const allProducts = useSelector(selectAllProducts);
    const isLoading = useSelector(getIsLoadingProducts);

    useEffect(() => {
        if(!isLoading) {
            if(!categoryData) {
                setData(allProducts);
            } else {
                const d = allProducts && allProducts.filter(item => item.category === categoryData);
                setData(d);
            }
            window.scrollTo(0,0);
        }
    }, [isLoading, categoryData])

    return (
    <div>
        <Header activeHeading={3}/>
        {isLoading ? <Loader />
        :
        <div className='section mt-6 min-h-[80vh]'>
            { data?.length > 0 &&
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data?.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>}
            { data?.length === 0 &&
            <div className='h-[70vh] normalFlex justify-center'>
                <h4 className='text-[24px]'>No products found!</h4>
            </div>
            }
        </div>
        }
        <Footer />
    </div>
  )
}

export default Products