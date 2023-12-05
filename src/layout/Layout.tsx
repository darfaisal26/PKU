import PatientSideNav from '../components/patientSideNav'
import AdminSideNav from '../components/AdminSideNav'
import { Outlet } from 'react-router-dom'
// import { useEffect } from 'react'

const Layout = () => {
  // const dummyUserRole =
  //   localStorage.getItem('userRole') || 'Admin' || 'Clinician'

  // const saveUserRole = (role: string) => {
  //   localStorage.setItem('userRole', role)
  // }

  // useEffect(() => {
  //   saveUserRole(dummyUserRole)
  // }, [])
  const userRole = localStorage.getItem('userRole') || 'Admin'
  return (
    <div className='bg-green-900'>
      <aside>
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
      <main className='w-[80%] ml-auto h-auto '>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
