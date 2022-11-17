import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../../Layout/DashboardLayout'
import Main from '../../Layout/Main'
import Appointment from '../../Pages/Appointment/Appointment/Appointment'
// import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard'
import MyAppointment from '../../Pages/Dashboard/MyAppointment/MyAppointment'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import Register from '../../Pages/Register/Register'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/register',
                element: <Register></Register>
            }

        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            }
        ]
    }
])