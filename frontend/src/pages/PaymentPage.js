import React, { useEffect } from 'react'
import Header from '../components/Layout/Header/Header2'
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import PaymentContent from '../components/Payment/PaymentContent'

const PaymentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <CheckoutSteps active={2} />
            <PaymentContent />
            <Footer />
        </div>
    )
}

export default PaymentPage