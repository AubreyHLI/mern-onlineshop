import React, { useEffect } from 'react';
import Banner from '../components/HomePage/Banner';
import BestDeals from '../components/HomePage/BestDeals';
import Categories from '../components/HomePage/Categories';
import FeaturedProduct from '../components/HomePage/FeaturedProduct';
import Sponsored from '../components/HomePage/Sponsored';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header/Header2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../redux/features/productsSlice';

const Home = () => {
  const loading = useSelector((state) => state.user.loading);
  const isLoadingProducts = useSelector((state) => state.products.isLoadingProducts);
  const dispatch = useDispatch();

  useEffect(() => {
		window.scrollTo(0,0);
	}, [])

  return (
    <>
      {!loading && !isLoadingProducts &&
        <div className='bg-gray-100'>
          <Header activeHeading={1} />
          <Banner />
          <Categories />
          <BestDeals />
          <FeaturedProduct />
          <Sponsored />
          <Footer />
      </div>
      }
    </>
  )
}

export default Home