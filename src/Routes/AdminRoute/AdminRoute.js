import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    const location = useLocation()
    if (loader || isAdminLoading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <Loading></Loading>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};


export default AdminRoute;
