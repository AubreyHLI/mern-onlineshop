import React, { useEffect } from 'react'
import CheckoutContent from '../components/Checkout/CheckoutContent';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../redux/features/shoppingcartSlice';


const CheckoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
    window.scrollTo(0, 0);
}, []);
  
  return (
    <>
        <CheckoutSteps active={1} />
        <CheckoutContent />
    </>
  )
}

export default CheckoutPage