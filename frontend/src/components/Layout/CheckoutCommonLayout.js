import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header2';
import Footer from './Footer';

const CheckoutCommonLayout = () => {
    return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
    )
}

export default CheckoutCommonLayout