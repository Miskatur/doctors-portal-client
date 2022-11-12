import React from 'react';

const CustomButton = ({ children }) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white font-bold">{children}</button>
    );
};

export default CustomButton;