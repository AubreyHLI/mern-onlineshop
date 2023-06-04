import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header/Header2'
import ProductDetails from '../components/Products/ProductDetails'
import SuggestedProds from '../components/Products/SuggestedProds'
import { selectAllProducts } from '../redux/features/productsSlice'


const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const allProducts = useSelector(selectAllProducts);

    useEffect(() => {
        const p = allProducts?.find(item => item._id === id);
        setProduct(p);
        window.scrollTo(0,0);
    }, [id])


    return (
        <div>
            <Header />
            <ProductDetails data={product}/>
            {product && <SuggestedProds data={product}/>}
            <Footer />
        </div>
    )
}

export default SingleProduct