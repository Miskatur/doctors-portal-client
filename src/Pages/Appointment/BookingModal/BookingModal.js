import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const date = format(selectedDate, 'PP')
    const { name, slots } = treatment; //treatment is appointment options

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
            slot
        }
        //TODO: Send data to server and once data is saved 
        // then close the modal and display success toast
        console.log(booking);
        setTreatment(null)
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-neutral">{name}</h3>
                    <form onSubmit={handleBooking}>
                        <input type="text" placeholder="date" value={date} className="input input-bordered w-full my-5 font-semibold " disabled />

                        <select name='slot' className="select select-bordered w-full mb-5">
                            {slots?.length === 0 ?
                                <option selected disabled>Try Another day</option>
                                :
                                slots?.map((slot, i) => <option
                                    key={i}
                                    value={slot}
                                >{slot}</option>)
                            }

                        </select>

                        <input type="text" name='name' placeholder="Full Name" className="input input-bordered font-semibold text-neutral w-full mb-5" required />

                        <input type="number" name='phone' placeholder="Phone Number" className="input input-bordered font-semibold text-neutral w-full mb-5 " required />

                        <input type="email" name='email' placeholder="Email" className="input input-bordered font-semibold text-neutral w-full mb-5" required />
                        <input type="submit" value="Submit" className='btn text-white font-semibold w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;