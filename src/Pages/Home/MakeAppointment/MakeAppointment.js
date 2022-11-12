import React from 'react';
import doctor from '../../../assets/images/doctor-small.png'
import banner from '../../../assets/images/appointment.png'
import CustomButton from '../../../components/ButtonComponent/CustomButton';

const MakeAppointment = () => {
    return (
        <section className=' mt-64 mb-32 bg-no-repeat bg-cover max-w-screen' style={{ backgroundImage: `url(${banner})` }}>
            <div className='grid md:grid-cols-2 pl-5'>
                <div className='lg:flex hidden justify-center items-center'>
                    <img src={doctor} className="ml-12 -mt-32" alt="" />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='py-10'>
                        <p className='text-primary font-semibold text-xl pb-5'>Appointment</p>
                        <h1 className=' text-4xl font-bold text-white text-left'>Make an appointment Today</h1>
                        <p className='py-9 lg:mr-16 text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <CustomButton>Get an Appointment</CustomButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;