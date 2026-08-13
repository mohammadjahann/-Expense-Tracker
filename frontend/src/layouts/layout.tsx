import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout