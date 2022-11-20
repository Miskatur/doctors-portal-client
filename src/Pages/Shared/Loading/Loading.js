import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen'>
                <HashLoader color="#36d7b7" size={35} />
            </div>
        </div>
    );
};

export default Loading;