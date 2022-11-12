import React, { useState } from 'react';
import banner from '../../../assets/images/bg.png'
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
        footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
    }

    return (
        <div className='py-10 lg:py-40  bg-no-repeat bg-cover bg-center bg-transparent' style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className=" rounded-lg lg:w-1/2" alt='' />
                    <div className='lg:mr-10'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            footer={footer}

                        />
                        {/* <p>You have selected : {format(selectedDate, 'PP')}.</p> */}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AppointmentBanner;