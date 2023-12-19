import AdminSideNav from '../components/AdminSideNav'
import ClinicianSideNav from '../components/ClinicianSideNav'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
  const userRole = localStorage.getItem('userRole') || 'Admin'

  if (!userRole) {
    return <Navigate to='/' />
  }

  if (userRole === 'Admin') {
    return <AdminSideNav />
  }

  return <ClinicianSideNav />
}

export default ProtectedRoutes
