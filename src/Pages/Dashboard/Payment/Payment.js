import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_key}`);

const Payment = () => {
    const navigation = useNavigation()
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;

    if (navigation.state === 'loading') {
        return <Loading></Loading>
    }

    return (
        <div className='px-5'>
            <h2 className="text-2xl text-center my-5">Payment for <span className=' font-bold text-md'>{treatment}</span></h2>
            <p className='text-center text-sm'>Please pay <span className=' font-bold text-md'>${price}</span> for your appointment on <span className=' font-bold text-md'>{appointmentDate}</span>  at <span className=' font-bold text-md'>{slot}.</span></p>

            <div className='my-16 '>
                <h2 className='text-center text-xl font-semibold my-5'>Your Payment Information here</h2>
                <div className='w-full lg:w-3/5 mx-auto border-2 p-10 shadow-lg rounded-lg bg-base-100'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            booking={booking}
                        />
                    </Elements>

                </div>
            </div>
        </div>
    );
};

export default Payment;