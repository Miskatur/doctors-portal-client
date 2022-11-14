import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Register = () => {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')

    const handleRegister = (data) => {
        setErrorMessage('')
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user)
                handleUserInfo(data.name)
                toast.success('User created Successfully.')
                navigate('/')
            })
            .catch(error => {
                console.error(error)
                const message = error.message;
                setErrorMessage(message)
            })
    }
    const handleUserInfo = name => {
        updateUser(name)
            .then(() => { })
            .catch(err => console.error(err))
    }

    return (
        <div className='h-[600px] flex justify-center items-center mx-5'>
            <div className='w-full lg:w-1/3 border-1 shadow-xl p-8'>
                <h2 className='text-3xl text-center'>Register Form</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            name="name"
                            type="text"
                            className="input input-bordered w-full" />
                        {errors.name?.type === 'required' && <p className='text-error'>Name is required</p>}

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input {...register("email",
                            { required: "Email Address is required" })}
                            name="email"
                            type="email"
                            className="input input-bordered w-full" />

                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full mb-5 ">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password should be more than 6 characters or more"
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z].*[a-z])/, message: "Your password should have  Uppercase, Lowercase and number value"

                                }
                            })}

                            name="password"
                            type="password"
                            className="input input-bordered w-full" />

                        {<p className='text-error'>{errors.password?.message}</p>}

                        <div>
                            {
                                errorMessage && <p className='text-error'>{errorMessage}</p>
                            }
                        </div>

                    </div>

                    <input type="submit" className='btn font-semibold text-white w-full' value="Register" />

                    <p className='font-semibold text-sm my-3'>Already Have an Account? <Link className='text-secondary font-bold' to={'/login'}> Login Here</Link></p>

                    <div className="divider">OR</div>

                    <button className="btn btn-outline w-full">Sign In With Google</button>

                </form>
            </div>
        </div>
    );
};

export default Register;