import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import PaymentContent from '../components/Payment/PaymentContent'
import axios from 'axios'
import { SERVER_URL } from '../static/server'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PaymentPage = () => {
    const [stripeApiKey, setStripeApiKey] = useState('');

    const getStripeApikey = async () => {
		const response = await axios.get(`${SERVER_URL}/payment/getStripeapikey`, { withCredentials: true });
		setStripeApiKey(response.data.stripeApikey);
	}

    useEffect(() => {
        getStripeApikey();
        window.scrollTo(0, 0);
    }, [])

    const stripePromise = loadStripe(stripeApiKey);

    return (
        <Elements stripe={stripePromise}>
            <CheckoutSteps active={2} />
            <PaymentContent />
        </Elements>
    )
}

export default PaymentPage