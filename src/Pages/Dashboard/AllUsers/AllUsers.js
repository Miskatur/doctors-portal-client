import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
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
                                    <td><button className='btn btn-ghost text-red-600'><FaTrashAlt /></button></td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllUsers;