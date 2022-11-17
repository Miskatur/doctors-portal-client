import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

const Service = ({ service }) => {
    const { title, description, img } = service;
    const { isDarkMode } = useContext(AuthContext)
    return (
        <div className='flex flex-col justify-center items-center shadow-lg rounded-lg p-5'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='my-10'>
                <h3 className={`text-lg text-center ${isDarkMode ? "text-white" : "text-neutral"} font-semibold`}>{title}</h3>
                <p className={`text-center px-10 ${isDarkMode ? "text-white" : "text-dark"}`}>{description}</p>
            </div>
        </div>
    );
};

export default Service;