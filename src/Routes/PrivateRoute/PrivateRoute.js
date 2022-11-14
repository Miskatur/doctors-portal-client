import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()
    if (loader) {
        return <div className='flex justify-center items-center min-h-screen'>
            <PacmanLoader
                color="#36d7b7"
                size={100}
            />
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;