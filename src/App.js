import { createBrowserRouter, RouterProvider   } from 'react-router-dom'
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RootLayout from "./Pages/Root/Root";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Table from "./Pages/TablePage/TablePage";
import './App.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />}, // index: true indicates that this is the root path
            {
                path: 'login',
                element: <ProtectedRoute showLogged = {false} element={<LoginPage /> } />
            },
            {
                path: '/table',
                element: <ProtectedRoute showLogged = {true} element={<Table />} />},
        ]
    },

])

function App() {
    return <RouterProvider router={router} />
}

export default App;