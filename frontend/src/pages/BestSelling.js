import React, { useEffect, useState } from "react";
import Header from '../components/Layout/Header/Header2';
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Products/ProductCard";
import { useSelector } from "react-redux";
import { getIsLoadingProducts, selectAllProducts } from "../redux/features/productsSlice";
import Loader from "../components/Layout/Loader";


const BestSelling = () => {
    const [data, setData] = useState([]);
    const allProducts = useSelector(selectAllProducts);
    const isLoading = useSelector(getIsLoadingProducts);

    useEffect(() => {
        if(!isLoading){
            const allProductsData = allProducts ? [...allProducts] : [];
            const d = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);
            setData(d);
            window.scrollTo(0,0);
        }
    }, [isLoading])


    return (
    <div>
        <Header activeHeading={2}/>
        {isLoading ? <Loader /> :
        <div className='section mt-6 min-h-[80vh]'>
            { data?.length === 0 &&
            <div className='h-[70vh] normalFlex justify-center'>
                <h4 className='text-[24px]'>No products found!</h4>
            </div>}
            { data?.length > 0 &&
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data?.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>}
        </div> }
        <Footer />
    </div>
  )
}

export default BestSelling