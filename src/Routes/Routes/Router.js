import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../../Layout/DashboardLayout'
import Main from '../../Layout/Main'
import Appointment from '../../Pages/Appointment/Appointment/Appointment'
import AddDoctor from '../../Pages/Dashboard/AddDoctor/AddDoctor'
import AllUsers from '../../Pages/Dashboard/AllUsers/AllUsers'
import ManageDoctors from '../../Pages/Dashboard/ManageDoctors/ManageDoctors'
// import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard'
import MyAppointment from '../../Pages/Dashboard/MyAppointment/MyAppointment'
import Payment from '../../Pages/Dashboard/Payment/Payment'
import ErrorPage from '../../Pages/ErrorPage/ErrorPage'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import Register from '../../Pages/Register/Register'
import DisplayError from '../../Pages/Shared/DisplayError/DisplayError'
import AdminRoute from '../AdminRoute/AdminRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
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
            },


        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <PrivateRoute><AddDoctor></AddDoctor></PrivateRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-chi.vercel.app/booking/${params.id}`)
            }
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
])