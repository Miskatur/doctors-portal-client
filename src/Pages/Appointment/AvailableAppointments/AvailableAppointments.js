import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption/AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState({})
    const date = format(selectedDate, 'PP');
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ["appointmentOptions", date],
        queryFn: () => fetch(`https://doctors-portal-server-chi.vercel.app/appointmentOptions?date=${date}`)
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-20'>
            <p className='text-center text-secondary font-bold'>Available Appointments {format(selectedDate, 'PP')}.</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 my-16 lg:mx-20'>
                {

                    appointmentOptions.map(option => <AppointmentOption
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
                    refetch={refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;