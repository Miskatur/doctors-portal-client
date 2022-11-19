import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUserWithEmail, signInwithGoogle, forgetPassword, isDarkMode } = useContext(AuthContext)
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    if (token) {
        navigate(from, { replace: true })
    }

    const [email, setEmail] = useState('')

    const googleProvider = new GoogleAuthProvider()

    const [errorMessage, setErrorMessage] = useState(false)

    const handleLogin = data => {
        setErrorMessage('')
        loginUserWithEmail(data.email, data.password)
            .then(res => {
                const user = res.user;
                setLoginUserEmail(data.email)
                console.log(user)
                toast.success("User Logged In Succesfully")
            })
            .catch(err => {
                const message = err.message;
                console.log(message)
                setErrorMessage(message)
            })
    }

    const handleForgetPassword = () => {
        forgetPassword(email)
            .then(() => {
                alert("Check your Email Or Spam Folder for reset Email.")
            })
            .catch(err => console.error(err))
    }

    const handleGoogleSignIn = () => {
        setErrorMessage('')
        signInwithGoogle(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                const message = error.message;
                setErrorMessage(message)
            })
    }

    return (
        <div className='h-[600px] flex justify-center items-center mx-5'>
            <div className='border-1 shadow-xl p-8 w-full lg:w-1/3 rounded-xl'>
                <h2 className={`text-3xl ${isDarkMode ? "text-white" : "text-black"} font-semibold text-center my-3`}>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)} >
                    <div className="form-control w-full">
                        <label className="label"><span className={`label-text ${isDarkMode ? "text-white" : "text-black"}`}>Email</span></label>
                        <input {...register("email",
                            { required: true, onBlur: (e) => setEmail(e.target.value) })}
                            aria-invalid={errors.email ? "true" : "false"}
                            type="email"
                            className={`input input-bordered text-black`} />
                        {errors.email?.type === 'required' && <p className='text-error'>Email Address is required</p>}

                    </div>

                    <div className="form-control w-full mb-5">
                        <label className="label"><span className={`${isDarkMode ? "text-white" : "text-black"} label-text`}>Password</span></label>
                        <input {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password Should Be More Than 6 Characters"
                            }
                        })}
                            aria-invalid={errors.password ? "true" : "false"}
                            type="password"
                            className='input input-bordered text-black' />
                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}

                        <label className="label text-xs font-semibold"><span className={`label-text cursor-pointer hover:text-error ${isDarkMode ? 'text-white' : 'text-black'}`} ><p onClick={handleForgetPassword}>Forgot Password?</p></span></label>
                        {
                            errorMessage &&
                            <p className='text-error'>{errorMessage}</p>

                        }
                    </div>
                    <input type="submit" className='btn font-semibold text-white w-full' value="LogIn" />
                </form>

                <p className='text-center my-3'>Haven't an Account? <Link className='font-bold text-secondary' to={'/register'}>Register Now</Link></p>
                <div className="divider">OR</div>
                <button className={`btn btn-outline w-full ${isDarkMode ? 'text-white hover:text-black hover:bg-white' : 'text-black'}`} onClick={handleGoogleSignIn}>Sign In With Google</button>
            </div>
        </div>
    );
};

export default Login;