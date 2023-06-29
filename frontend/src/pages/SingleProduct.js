import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header/Header2'
import ProductDetails from '../components/Products/ProductDetails'
import SuggestedProds from '../components/Products/SuggestedProds'
import {  getIsLoadingProducts, selectAllProducts } from '../redux/features/productsSlice'
import Loader from '../components/Layout/Loader'


const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const allProducts = useSelector(selectAllProducts);
    const isLoading = useSelector(getIsLoadingProducts);

    useEffect(() => {
        if(!isLoading) {
            const p = allProducts?.find(item => item._id === id);
            setProduct(p);
            window.scrollTo(0,0);
        }
    },[isLoading, id])


    return (
        <div>
            <Header />
            {isLoading ? <Loader /> 
            :<div className='min-h-[100vh]'>
                <ProductDetails data={product}/>
                {product && <SuggestedProds data={product}/>}
            </div>
            }
            <Footer />
        </div>
    )
}

export default SingleProduct