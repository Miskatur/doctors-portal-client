import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, isDarkMode, signInwithGoogle, setLoader } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const googleProvider = new GoogleAuthProvider()
    const [createdEmail, setCreatedEmail] = useState('')
    const navigate = useNavigate()
    const [token] = useToken(createdEmail)

    if (token) {
        navigate('/')
    }

    const handleRegister = (data) => {
        setErrorMessage('')
        setLoader(true)
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user)
                handleUserInfo(data.name, data.email)
                toast.success('User created Successfully.')
            })
            .catch(error => {
                console.error(error)
                const message = error.message;
                setErrorMessage(message)
            })
    }
    const handleUserInfo = (name, email) => {
        updateUser(name)
            .then(() => {
                saveUser(name, email)
                setLoader(false)
            })
            .catch(err => console.error(err))
    }

    const handleGoogleSignIn = () => {
        setErrorMessage('')
        signInwithGoogle(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate('/')
            })
            .catch(error => {
                const message = error.message;
                setErrorMessage(message)
            })
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(() => {
                setCreatedEmail(email)
            })
    }

    return (
        <div className='h-[600px] flex justify-center items-center mx-5'>
            <div className='w-full lg:w-1/3 border-1 shadow-xl p-8'>
                <h2 className='text-3xl text-center'>Register Form</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Full Name</span>
                        </label>
                        <input {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            name="name"
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
                            name="email"
                            type="email"
                            className="input input-bordered w-full text-black" />

                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full mb-5 ">
                        <label className="label">
                            <span className={`label-text font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Password</span>
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
                            className="input text-black input-bordered w-full" />

                        {<p className='text-error'>{errors.password?.message}</p>}

                        <div>
                            {
                                errorMessage && <p className='text-error'>{errorMessage}</p>
                            }
                        </div>

                    </div>

                    <input type="submit" className='btn font-semibold text-white w-full' value="Register" />


                </form>
                <p className='font-semibold text-sm my-3'>Already Have an Account? <Link className='text-secondary font-bold' to={'/login'}> Login Here</Link></p>

                <div className="divider">OR</div>

                <button className={`btn btn-outline w-full ${isDarkMode ? 'text-white hover:text-black hover:bg-white' : 'text-black'}`} onClick={handleGoogleSignIn}>Sign In With Google</button>
            </div>
        </div>
    );
};

export default Register;