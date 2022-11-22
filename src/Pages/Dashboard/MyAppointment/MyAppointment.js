import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyAppointment = () => {
    const { user } = useContext(AuthContext)

    const url = `https://doctors-portal-server-chi.vercel.app/booking?email=${user?.email}`
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })

    const [deletingAppointment, setDeletingAppointment] = useState(null)
    const handleDeleteAppointment = booking => {
        fetch(`https://doctors-portal-server-chi.vercel.app/booking/${booking._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data?.deletedCount > 0) {
                    toast.success(`You have succesfully deleted your Appointment`)
                    refetch()
                }
            })
    }

    const closeModal = () => {
        setDeletingAppointment(null)
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-3xl'>My Appointment</h2>

            <div className="overflow-x-auto my-10 ">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, i) =>
                                <tr key={i} className="hover">
                                    <th>{i + 1}</th>
                                    <td>{booking?.name}</td>
                                    <td>{booking?.treatment}</td>
                                    <td>{booking?.appointmentDate}</td>
                                    <td>{booking?.slot}</td>
                                    <td>{booking?.price}</td>
                                    <td>
                                        {
                                            booking.price && !booking.paid &&
                                            <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className='btn btn-primary btn-sm'>Pay Now</button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid &&
                                            <span className='text-green-600'>Paid</span>
                                        }
                                    </td>
                                    <td>
                                        <label onClick={() => setDeletingAppointment(booking)} htmlFor="confirmation-modal" className="btn btn-ghost ">
                                            <FaTrashAlt className='text-lg text-red-600' />
                                        </label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingAppointment &&
                <ConfirmationModal
                    title={`Are you Sure You want to Delete`}
                    message={`If you delete ${deletingAppointment?.treatment}, it can not be undone again.`}
                    successAction={handleDeleteAppointment}
                    successButtonName={`Delete`}
                    modalData={deletingAppointment}
                    closeModal={closeModal}
                ></ConfirmationModal>

            }
        </div>
    );
};

export default MyAppointment;