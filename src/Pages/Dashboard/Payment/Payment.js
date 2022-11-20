import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;
    return (
        <div>
            <h2 className="text-2xl text-center my-5">Payment for <span className=' font-bold text-md'>{treatment}</span></h2>
            <p className='text-center text-sm'>Please pay <span className=' font-bold text-md'>${price}</span> for your appointment on <span className=' font-bold text-md'>{appointmentDate}</span>  at <span className=' font-bold text-md'>{slot}.</span></p>
        </div>
    );
};

export default Payment;