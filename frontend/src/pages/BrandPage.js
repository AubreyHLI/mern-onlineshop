import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BrandInfo from '../components/Brand/BrandInfo'
import BrandProducts from '../components/Brand/BrandProducts'
import { SERVER_URL } from '../static/server';
import Loader from '../components/Layout/Loader';


const BrandPage = () => {
	const { id } = useParams();
	const [brandData, setBrandData] = useState({});
	const [isLoading,setIsLoading] = useState(false);

  	useEffect(() => {
		setIsLoading(true);
		axios.get(`${SERVER_URL}/brands/getBrand/${id}`)
		.then((res) => {
			setBrandData(res.data.brand);
			setIsLoading(false);
		}).catch((error) => {
			console.log(error);
			setIsLoading(false);
		})
  	}, [])
  
  	useEffect(() => {
    	window.scrollTo(0,0);
  	}, [])

  	return (
	<>
		{ isLoading 
		? <Loader />
		:(
		<div className='section bg-[#f5f5f5]'>
			<div className="w-full 800px:flex py-10 justify-between">
				<div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
					<BrandInfo brandId={id} brandData={brandData}/>
				</div>
				<div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
					<BrandProducts brandId={id} />
				</div>
			</div>
		</div>
		)
		}
	</>
  	)
}

export default BrandPage