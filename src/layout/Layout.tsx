import PatientSideNav from '../components/patientSideNav'
import AdminSideNav from '../components/AdminSideNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const userRole = localStorage.getItem('userRole') || 'Admin'
  return (
    <div className='flex'>
      <aside className='w-[18%]'>
        {/* Conditionally render side navigation based on user role */}
        {userRole === 'Admin' ? (
          <AdminSideNav />
        ) : userRole === 'Clinician' ? (
          <PatientSideNav />
        ) : (
          // Handle other roles or show an error message
          <div>Error: Invalid user role</div>
        )}
      </aside>
      <main className='w-[82%] h-auto bg-green-600'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
