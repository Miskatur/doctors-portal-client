import React, { useContext } from 'react';
import banner from '../../../assets/images/bg.png'
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    const { isDarkMode } = useContext(AuthContext)

    return (
        <div className='py-10 lg:py-40  bg-no-repeat bg-cover bg-center bg-transparent' style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className=" rounded-lg lg:w-1/2" alt='' />
                    <div className={`lg:mr-16 rounded-xl ${isDarkMode ? "bg-gray-800 text-white" : "bg-base-100 text-black"}`}>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={(data) => {
                                if (data) {
                                    setSelectedDate(data)
                                }
                            }}
                        />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AppointmentBanner;