import React from 'react';
import flouride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'
import cavity from '../../../assets/images/cavity.png'
import Service from './Service/Service';

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Fluoride Treatment",
            description: "Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist.",
            img: flouride,
        },
        {
            id: 1,
            title: "Cavity Filling",
            description: "A cavity filling is when the dentist fills the opening in your tooth with some kind of material.",
            img: cavity,
        },
        {
            id: 1,
            title: "Teeth Whitening",
            description: "Best Teeth Whitening At LASER DENTAL In Uttara. We Utilise World's Most Advanced Teeth Whitening System.",
            img: whitening,
        },
    ]
    return (
        <div className='my-20'>
            <div className='text-center'>
                <h3 className='uppercase text-primary font-bold text-xl'>Our Services</h3>
                <h1 className=' text-neutral text-4xl my-5'>Services We Provide</h1>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 my-20'>
                {
                    services.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>

        </div>
    );
};

export default Services;