import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Client from './Client/Client';

const Testomonial = () => {

    const clients = [
        {
            id: 1,
            name: "Winson Herry",
            description: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "California",
            image: people1
        },
        {
            id: 2,
            name: "Ketty Perry",
            description: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "Los Angeles",
            image: people2
        },
        {
            id: 3,
            name: "Wuan Kun Lee",
            description: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "Tokyo, Japan",
            image: people3
        }
    ]

    return (
        <section className='my-32'>
            <div className='flex justify-between items-center mb-16'>
                <div>
                    <p className='text-primary font-bold uppercase'>Testimonial</p>
                    <h2 className='text-4xl text-neutral'>What Our Patients Says</h2>
                </div>
                <div>
                    <img src={quote} alt="" className='w-1/2 ml-auto' />
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    clients.map(client => <Client
                        key={client.id}
                        client={client}
                    ></Client>)
                }
            </div>
        </section>

    );
};

export default Testomonial;