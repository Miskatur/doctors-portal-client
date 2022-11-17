import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen'>
                <PacmanLoader
                    color="#36d7b7"
                    size={100}
                />
            </div>
        </div>
    );
};

export default Loading;