import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, isAuthenticated}) => {
    const isLoadingUser = useSelector(state => state.user.loading);

    console.log('isAuthenticated:',isAuthenticated);

    if(!isLoadingUser && !isAuthenticated) {
        return <Navigate to='/login' replace/>
    } else if(!isLoadingUser && isAuthenticated){
        return children
    }
}

export default ProtectedRoute