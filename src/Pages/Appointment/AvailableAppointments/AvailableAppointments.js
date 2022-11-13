import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption/AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    const [AppointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState({})
    useEffect(() => {
        fetch(`appointmentOptions.json`)
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))

    }, [])

    return (
        <div className='my-20'>
            <p className='text-center text-secondary font-bold'>Available Appointments {format(selectedDate, 'PP')}.</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 my-16 lg:mx-20'>
                {

                    AppointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;