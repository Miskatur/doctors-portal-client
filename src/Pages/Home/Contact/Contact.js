import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'


const Contact = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 lg:my-20'>
            <div className='bg-primary flex items-center px-8 py-10 rounded-lg bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC]'>
                <div>
                    <img src={clock} alt="" />
                </div>
                <div className='text-white ml-3'>
                    <h1 className='text-xl font-bold'>Opening Hours</h1>
                    <p className='font-semibold'>10:00 AM - 11:30 PM <br />
                        From Saturday - Thursday</p>
                </div>
            </div>
            <div className='bg-neutral flex items-center px-8 py-10 rounded-lg'>
                <div>
                    <img src={marker} alt="" />
                </div>
                <div className='text-white ml-3'>
                    <h1 className='text-xl font-bold'>Visit our location</h1>
                    <p className='font-semibold'>Brooklyn, NY 10036, United States</p>
                </div>
            </div>
            <div className='bg-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] flex items-center px-8 py-10 rounded-lg'>
                <div>
                    <img src={phone} alt="" />
                </div>
                <div className='text-white ml-5'>
                    <h1 className='text-xl font-bold'>Contact us now</h1>
                    <p className='font-semibold'>+000 123 456789</p>
                </div>
            </div>


        </div>
    );
};

export default Contact;