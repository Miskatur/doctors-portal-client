import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const CheckoutForm = ({ booking }) => {
    const navigate = useNavigate()
    const [cardError, setCardError] = useState("")
    const [success, setSuccess] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const { price, name, email, _id } = booking;
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://doctors-portal-server-chi.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setIsLoading(false)
            });
    }, [price]);

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        console.log(paymentMethod)

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },

            },
        );
        console.log(paymentIntent);

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        if (paymentIntent.status === "succeeded") {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            }
            fetch(`https://doctors-portal-server-chi.vercel.app/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        setSuccess('Congrats! Your Payment Completed!')
                        setTransactionId(paymentIntent.id)
                        toast.success(`Congrats! Your Payment Completed!`)
                        navigate('/dashboard')
                    }
                })
        }
        setProcessing(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-sm btn-primary mt-5' disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>
            <p className='text-red-500 text-center pt-3'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p><small>Your Transaction Id: {transactionId}</small></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;