import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header2';
import Footer from './Footer';

const CkeckoutCommonLayout = () => {
    return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
    )
}

export default CkeckoutCommonLayout