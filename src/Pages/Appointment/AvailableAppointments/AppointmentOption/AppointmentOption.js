import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

const AppointmentOption = ({ option, setTreatment }) => {
    const { name, slots } = option;
    const { isDarkMode, user } = useContext(AuthContext)
    return (
        <div>
            <div className={`card w-96 ${isDarkMode ? "bg-gray-800" : "bg-base-100"} shadow-xl`}>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-secondary">{name}</h2>
                    <p className={`${isDarkMode ? "text-white" : " text-black"}`}>{slots?.length > 0 ? slots[0] : 'Try Another day.'}</p>
                    <p className={`uppercase text-xs ${isDarkMode ? "text-white" : " text-black"} font-mono`}>{slots?.length} {slots.length > 1 ? "spaces " : "space"} available</p>
                    <div className="card-actions mt-3">
                        {
                            user?.uid ?
                                <label
                                    disabled={slots?.length === 0}
                                    onClick={() => setTreatment(option)}
                                    htmlFor="booking-modal"
                                    className={`btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white font-bold`}>Book Appointment</label>
                                :
                                <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <label
                                            disabled
                                            onClick={() => setTreatment(option)}
                                            htmlFor="booking-modal"
                                            className={`btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white font-bold`}>Book Appointment</label>
                                        <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>For Booking an Appointment, <br />
                                            Please <Link to={'/login'} className="text-blue-600">Login</Link></p>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;