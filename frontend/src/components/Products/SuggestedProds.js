import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { productData } from '../../static/data';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/features/productsSlice';

const SuggestedProds = ({data}) => {
    const [products, setProducts] = useState(null);    
    // const allProducts = useSelector(state => state.products.allProducts);
    const allProducts = useSelector(selectAllProducts);

    useEffect(() => {
        const d = allProducts && allProducts.filter(i => i.category === data.category);
        setProducts(d);
    }, []);
    
    return (
        <div>
            { data &&
            <div className='p-4 section'>
                <h2 className='heading text-[25px] font-[500] border-b mb-5'>
                    Related Product
                </h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    { products && products.map((i,index) => <ProductCard data={i} key={index} />) }
                </div>
            </div>
            }
        </div>
    );
}

export default SuggestedProds