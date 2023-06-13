import React, { useEffect } from 'react'
import Header from '../components/Layout/Header/Header2';
import Footer from '../components/Layout/Footer';
import CheckoutContent from '../components/Checkout/CheckoutContent';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';


const CheckoutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
        <Header />
        <CheckoutSteps active={1} />
        <CheckoutContent />
        <Footer />
    </div>
  )
}

export default CheckoutPage