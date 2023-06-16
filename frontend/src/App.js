import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { fetchCartItems } from './redux/features/shoppingcartSlice';
import { fetchWishlist } from './redux/features/wishlistSlice';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { SERVER_URL } from './static/server';
import Products from './pages/Products';
import BestSelling from './pages/BestSelling';
import FAQ from './pages/FAQ';
import Events from './pages/Events';
import SingleProduct from './pages/SingleProduct';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import BrandPage from './pages/BrandPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';

import AdminHomepage from './pages/Admin/AdminHomepage';
import AdminProtectedRoute from './pages/Admin/AdminProtectedRoute';
import LoginAdmin from './pages/Admin/LoginAdmin';
import AdminCommonLayout from './components/Admin/AdminCommonLayout';
import AllProducts from './pages/Admin/AllProducts';
import AllBrands from './pages/Admin/AllBrands';
import AllOrders from './pages/Admin/AllOrders';
import AllEvents from './pages/Admin/AllEvents';
import AllUsers from './pages/Admin/AllUsers';
import AllRefunds from './pages/Admin/AllRefunds';
import AllCoupons from './pages/Admin/AllCoupons';
import AdminMessages from './pages/Admin/AdminMessages';
import AdminSettings from './pages/Admin/AdminSettings';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SingleOrder from './pages/SingleOrder';


const App = () => {
	const [stripeApiKey, setStripeApiKey] = useState('');
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const isAdmin =  useSelector(state => state.user.isAdmin);
	const dispatch = useDispatch();

	const getStripeApikey = async () => {
		const response = await axios.get(`${SERVER_URL}/payment/getStripeapikey`, { withCredentials: true });
		setStripeApiKey(response.data.stripeApikey);
	}

	useEffect(() => {
		getStripeApikey();
		dispatch(fetchAllProducts());
		dispatch(fetchAllBrands());
		dispatch(fetchAllEvents());
		dispatch(fetchUser());
		dispatch(fetchCartItems());
		dispatch(fetchWishlist());
		console.log('app reload');
	},[])

	const stripePromise = loadStripe(stripeApiKey);

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
				<Route path='/brand/:id' element={<BrandPage />} />
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
				<Route path='/payment' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<Elements stripe={stripePromise}>
							<PaymentPage />
						</Elements>
					</ProtectedRoute>
				}/>
				<Route path="/order/success" element={<OrderSuccessPage />} />
				<Route path='/order/:id' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<SingleOrder />
					</ProtectedRoute>
				}/>
				
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
					<Route path='allRefunds' element={<AllRefunds />}/>
					<Route path='allCoupons' element={<AllCoupons />}/>
					<Route path='messages' element={<AdminMessages />}/>
					<Route path='settings' element={<AdminSettings />}/>
				</Route>

			</Routes>
			<ToastContainer position='top-center' hideProgressBar={true}/>
		</div>
	)
}

export default App
