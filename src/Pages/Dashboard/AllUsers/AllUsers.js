import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null)

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-chi.vercel.app/users`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }

    const handleMakeAdmin = id => {
        fetch(`https://doctors-portal-server-chi.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount > 0) {
                    toast.success('Made Admin Successfully!')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }
    const closeModal = () => {
        setDeletingUser(null)
    }

    const handleDeleteUser = user => {
        fetch(`https://doctors-portal-server-chi.vercel.app/users/admin/${user?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.deletedCount > 0) {
                    toast.success(`You have succesfully deleted ${user?.name}`)
                    refetch()
                }
            })
    }

    return (
        <div>
            <h2>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) =>
                                <tr key={user._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{
                                        user?.role !== 'admin' && <button className='btn btn-xs btn-outline font-bold' onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>
                                    }</td>
                                    <td>
                                        <label onClick={() => setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-ghost ">
                                            <FaTrashAlt className='text-lg text-red-600' />
                                        </label>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingUser &&
                <ConfirmationModal
                    title={`Are you Sure You want to Delete`}
                    message={`If you delete ${deletingUser?.name}, it can not be undone again.`}
                    successAction={handleDeleteUser}
                    successButtonName={`Delete`}
                    modalData={deletingUser}
                    closeModal={closeModal}
                ></ConfirmationModal>

            }

        </div>
    );
};

export default AllUsers;