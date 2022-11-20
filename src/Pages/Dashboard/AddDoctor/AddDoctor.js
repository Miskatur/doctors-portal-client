import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { isDarkMode } = useContext(AuthContext)
    const navigate = useNavigate();
    const imageHostkey = process.env.REACT_APP_imgbb_key;

    const { data: specialities = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-chi.vercel.app/appointmentSpeciality`)
            const data = await res.json()
            return data;
        }
    })
    if (isLoading) {
        return <Loading />
    }

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostkey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData?.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgData.data.url
                    }

                    fetch(`https://doctors-portal-server-chi.vercel.app/doctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {

                            toast.success(`${data.name} is added successfully as a Doctor.`)
                            navigate('/dashboard/managedoctors')

                        })

                }

            })
    }
    return (
        <div className='my-10 px-5'>
            <div className='w-full lg:w-3/5 border-1 shadow-xl mx-auto p-8'>

                <h2 className='text-3xl text-center my-5'>Add a Doctor</h2>

                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Full Name</span>
                        </label>
                        <input {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            type="text"
                            className="input input-bordered w-full text-black" />
                        {errors.name?.type === 'required' && <p className='text-error'>Name is required</p>}

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Email</span>
                        </label>
                        <input {...register("email",
                            { required: "Email Address is required" })}
                            type="email"
                            className="input input-bordered w-full text-black" />

                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full mb-5 ">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Speciality</span>
                        </label>
                        <select {...register('speciality')} className="select select-bordered w-full">
                            {
                                specialities.map(speciality => <option key={speciality._id}>{speciality.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Full Name</span>
                        </label>
                        <input {...register("image", { required: true })}
                            aria-invalid={errors.image ? "true" : "false"}
                            type="file"
                            className="input input-bordered w-full text-black" />
                        {errors.image?.type === 'required' && <p className='text-error'>Photo is required</p>}

                    </div>

                    <input type="submit" className='btn font-semibold text-white w-full' value="Add a Doctor" />


                </form>
            </div>
        </div>
    );
};

export default AddDoctor;