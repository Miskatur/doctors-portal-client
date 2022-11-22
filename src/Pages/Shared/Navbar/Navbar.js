import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { FaSun, FaMoon } from 'react-icons/fa';


const Navbar = () => {
    const { user, logOut, isDarkMode, setIsDarkMode } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('accessToken')
                toast.success("User Logged Out Successfully")

            })
            .catch(err => console.error(err))
    }


    const menuItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/appointment'}>Appointment</Link></li>
        {/* <li><Link to='/contactus'>Contact Us</Link></li> */}

        {
            user?.email ? <>
                {/* <li><Link to={'/reviews'}>Reviews</Link></li> */}
                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                <li><Link className='font-semibold'>{user?.displayName}</Link></li>
                <li onClick={handleLogOut}><Link>Log Out</Link></li></> :
                <li><Link to={'/login'}>Login</Link></li>
        }
        <li className='flex justify-center items-center' >

            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
        </li>

    </>
    return (
        <div className={`navbar ${isDarkMode ? "bg-gray-800 text-white" : "bg-base-100 text-black"}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className={`menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 ${isDarkMode ? "bg-gray-800 text-white" : "bg-base-100 text-black"}`}>
                        {menuItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">Doctor's Portal</Link>
            </div>
            <div className="navbar-center hidden md:flex ml-auto">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost md:hidden ml-auto drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>


        </div>
    );
};

export default Navbar;