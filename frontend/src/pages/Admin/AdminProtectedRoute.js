import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({children, isAdmin}) => {
    if(!isAdmin) {
        return <Navigate to='/loginAdmin' replace/>
    }
    return children
}

export default AdminProtectedRoute