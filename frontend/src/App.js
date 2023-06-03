import './App.css';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Singup from './pages/Signup';
import AccountActivation from './pages/AccountActivation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/features/userSlice'; 
import { fetchAllProducts } from './redux/features/productsSlice';
import { fetchAllBrands } from './redux/features/brandsSlice';
import { fetchAllEvents } from './redux/features/eventsSlice';
import Products from './pages/Products';
import BestSelling from './pages/BestSelling';
import FAQ from './pages/FAQ';
import Events from './pages/Events';
import SingleProduct from './pages/SingleProduct';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
import BrandPage from './pages/BrandPage';

import AdminHomepage from './pages/Admin/AdminHomepage';
import AdminProtectedRoute from './pages/Admin/AdminProtectedRoute';
import LoginAdmin from './pages/Admin/LoginAdmin';
import AdminCommonLayout from './components/Admin/AdminCommonLayout';
import AllProducts from './pages/Admin/AllProducts';
import AllBrands from './pages/Admin/AllBrands';
import AllOrders from './pages/Admin/AllOrders';
import AllEvents from './pages/Admin/AllEvents';
import AllUsers from './pages/Admin/AllUsers';



const App = () => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const isAdmin =  useSelector((state) => state.user.isAdmin);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchAllProducts());
		dispatch(fetchAllBrands());
		dispatch(fetchAllEvents());
		console.log('app reload');
	},[])

	// reload app when click back btn
	useEffect(() => {    
		window.onpageshow = function(event) {
		  if (event.persisted) {
			window.location.reload();
		  }
		};
	 }, []);

	return (
		<div className='app bg-[#f5f5f5]'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/bestselling' element={<BestSelling />} />
				<Route path='/products' element={<Products />} />
				<Route path='/product/:id' element={<SingleProduct />} />
				<Route path='/events' element={<Events />} />
				<Route path='/faq' element={<FAQ />} />
				<Route path='/profile' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<ProfilePage />
					</ProtectedRoute>
				}/>
				<Route path='/checkout' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<CheckoutPage />
					</ProtectedRoute>
				}/>
				<Route path='/brand/:id' element={<BrandPage />} />

				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Singup />} />
				<Route path='/account-activation/:activation_token' element={<AccountActivation />} />

				{/* Admin pages */}
				<Route path='/loginAdmin' element={<LoginAdmin />} />
				<Route path='/admin' element={<AdminProtectedRoute isAdmin={isAdmin}>
												<AdminCommonLayout />
											 </AdminProtectedRoute>} >
					<Route index element={<AdminHomepage />}/>
					<Route path='allProducts' element={<AllProducts />} />
					<Route path='allBrands' element={<AllBrands />} />
					<Route path='allOrders' element={<AllOrders />} />
					<Route path='allEvents' element={<AllEvents />} />
					<Route path='allUsers' element={<AllUsers />} />
				</Route>

				

			</Routes>
			<ToastContainer position='top-center' hideProgressBar={true}/>
		</div>
	)
}

export default App
