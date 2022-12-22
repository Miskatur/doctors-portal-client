import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const date = format(selectedDate, 'PP')
    const { name, slots, price } = treatment; //treatment is appointment options
    const { user, isDarkMode } = useContext(AuthContext)
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;
        const booking = {
            appointmentDate: date,
            treatment: treatment?.name,
            name: name,
            email,
            phone,
            slot,
            price
        }
        //TODO: Send data to server and once data is saved 
        // then close the modal and display success toast

        fetch(`https://doctors-portal-server-chi.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null)
                    toast.success('Appointment booked Successfully.')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className={`modal-box relative ${isDarkMode ? "text-white bg-black" : "text-black"}`}>
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{name}</h3>
                    <form onSubmit={handleBooking}>
                        <input type="text" placeholder="date" value={date} className={`input input-bordered w-full my-5 font-semibold ${isDarkMode ? "text-white bg-black" : "text-black"}`} readOnly />

                        <select name='slot' className={`select select-bordered w-full mb-5 ${isDarkMode ? "text-white bg-black" : "text-black"}`}>
                            {slots?.length === 0 ?
                                <option selected disabled>Try Another day</option>
                                :
                                slots?.map((slot, i) => <option
                                    key={i}
                                    value={slot}
                                >{slot}</option>)
                            }

                        </select>

                        <input type="text" name='name' defaultValue={user?.displayName} placeholder="Full Name" className={`input input-bordered font-semibold ${isDarkMode ? "text-white bg-black" : "text-black"} w-full mb-5`} readOnly />

                        <input type="number" name='phone' placeholder="Phone Number" className={`input input-bordered font-semibold ${isDarkMode ? "text-white bg-black" : "text-black"} w-full mb-5 `} required />

                        <input type="email" name='email' placeholder='Your Email' defaultValue={user?.email} className={`input input-bordered font-semibold ${isDarkMode ? "text-white bg-black" : "text-black"} w-full mb-5`} readOnly />
                        <input type="submit" value="Submit" className='btn text-white font-semibold w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;