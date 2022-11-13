import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {
    const { name, slots } = option;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">

                <div className="card-body items-center text-center">
                    <h2 className="card-title text-secondary">{name}</h2>
                    <p>{slots?.length > 0 ? slots[0] : 'Try Another day.'}</p>
                    <p className='uppercase text-xs font-mono'>{slots?.length} {slots.length > 1 ? "spaces " : "space"} available</p>
                    <div className="card-actions mt-3">
                        <label
                            disabled={slots?.length === 0}
                            onClick={() => setTreatment(option)}
                            htmlFor="booking-modal"
                            className={`btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white font-bold`}>Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;