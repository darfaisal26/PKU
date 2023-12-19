import { Outlet } from 'react-router-dom'
import AdminSideNav from '../components/AdminSideNav'
import ClinicianSideNav from '../components/ClinicianSideNav'

const Layout = () => {
  const userRole = localStorage.getItem('userRole') || 'Admin'

  return (
    <div className='flex'>
      <aside className='w-[18%]'>
        {userRole === 'Admin' ? (
          <AdminSideNav />
        ) : userRole === 'Clinician' ? (
          <ClinicianSideNav />
        ) : (
          ''
        )}
      </aside>
      <main className='w-[82%] min-h-screen bg-[#1E5631]'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
