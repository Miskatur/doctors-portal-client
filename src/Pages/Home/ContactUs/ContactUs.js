import React from 'react';
import CustomButton from '../../../components/ButtonComponent/CustomButton';
import banner from '../../../assets/images/appointment.png'

const ContactUs = () => {
    return (
        <div>
            <div className='py-20  bg-cover' style={{ backgroundImage: `url(${banner})` }}>
                <div className='text-center'>
                    <h3 className='text-primary font-bold'>Contact Us</h3>
                    <h2 className='text-4xl text-white'>Stay connected with us</h2>
                </div>
                <div className='flex justify-center items-center'>
                    <form className='px-5'>
                        <input type="text" placeholder="Email Address" className="input input-bordered input-info w-full my-5" />
                        <input type="text" placeholder="Subject" className="input input-bordered input-info w-full mb-5" />
                        <textarea className="textarea textarea-info mb-5 w-full h-40" placeholder="Your Message"></textarea>
                        <div className='flex justify-center'>
                            <CustomButton> Submit </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;