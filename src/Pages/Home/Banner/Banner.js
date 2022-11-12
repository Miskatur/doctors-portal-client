import React from 'react';
import banner from '../../../assets/images/bg.png'
import chair from '../../../assets/images/chair.png'
import CustomButton from '../../../components/ButtonComponent/CustomButton';
const Banner = () => {
    return (
        <div className='py-10 lg:py-40  bg-no-repeat bg-cover bg-center bg-transparent' style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className=" rounded-lg lg:w-1/2" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold text-neutral font-sans">Your New Smile Starts Here</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <CustomButton>Get Started</CustomButton>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;