import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header/Header2'
import BrandInfo from '../components/Brand/BrandInfo'
import BrandProducts from '../components/Brand/BrandProducts'
import Loader from '../components/Layout/Loader';
import { useSelector } from 'react-redux';
import { selectProductsByBrand } from '../redux/features/productsSlice';
import { selectAllBrands } from '../redux/features/brandsSlice';
import { getIsLoadingBrands } from '../redux/features/brandsSlice';


const BrandPage = () => {
	const { id } = useParams();
	const [brandData, setBrandData] = useState(null);
	const allBrands = useSelector(selectAllBrands);
	const isLoading = useSelector(getIsLoadingBrands);
	const brandProducts = useSelector(state => selectProductsByBrand(state, id));
  
	useEffect(() => {
        if(!isLoading) {
            const b = allBrands?.find(item => item._id === id);
            setBrandData(b);
            window.scrollTo(0,0);
        }
    },[isLoading, id])

  	return (
	<>
		{ isLoading ? <Loader />
		:(
		<div className='section bg-[#f5f5f5]'>
			<div className="w-full h-screen 800px:flex py-5 justify-between">
				<div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0">
					<BrandInfo brandProducts={brandProducts} brandData={brandData} />
				</div>
				<div className="800px:w-[72%] mt-5 rounded-[4px]">
					<BrandProducts brandProducts={brandProducts} />
				</div>
			</div>
		</div>
		)
		}
	</>
  	)
}

export default BrandPage