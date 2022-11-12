import React from 'react';
import treatement from '../../../assets/images/treatment.png'
import CustomButton from '../../../components/ButtonComponent/CustomButton';

const SecondBanner = () => {
    return (
        <div className='grid md:grid-cols-2 my-32' >
            <div className='flex justify-center items-center'>
                <img src={treatement} className="lg:w-4/6" alt="" />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='py-10'>
                    <h1 className=' text-5xl font-bold text-neutral text-left'>Exceptional Dental  <br /> Care, on Your Terms</h1>
                    <p className='py-9 lg:mr-20'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <CustomButton>Get Started</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default SecondBanner;