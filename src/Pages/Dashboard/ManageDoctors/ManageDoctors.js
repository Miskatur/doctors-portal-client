import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-chi.vercel.app/doctors`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const handleDeleteDoctor = doctor => {
        fetch(`https://doctors-portal-server-chi.vercel.app/doctors/${doctor?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.deletedCount > 0) {
                    toast.success(`Successfully Deleted ${doctor?.name}.`)
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-3xl text-center my-5'>Manage Doctors : {doctors?.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>avatar</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors &&
                            doctors?.map((doctor, i) => <tr key={i}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={doctor?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='font-bold'>
                                    {doctor?.name}
                                </td>
                                <td>{doctor?.speciality}</td>
                                <th>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-ghost ">
                                        <FaTrashAlt className='text-2xl text-red-600' />
                                    </label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmationModal
                    title={`Are you Sure You want to Delete`}
                    message={`If you delete ${deletingDoctor?.name}, it can not be undone again.`}
                    successAction={handleDeleteDoctor}
                    successButtonName={`Delete`}
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>

            }
        </div>
    );
};

export default ManageDoctors;