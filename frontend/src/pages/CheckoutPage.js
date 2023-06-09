import React from 'react'
import Header from '../components/Layout/Header/Header2';
import Footer from '../components/Layout/Footer';
import CheckoutContent from '../components/Checkout/CheckoutContent';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';


const CheckoutPage = () => {
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