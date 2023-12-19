import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import pku from '../assets/logopku.jpg'
import { useCookies } from 'react-cookie'

const navigation = [
  {
    name: 'Dashboard',
    path: '/clinician-dashboard',
  },

  {
    name: 'Patients',
    path: '/clinician-patients',
  },
  {
    name: 'Assessments',
    path: '/clinician-Assessments',
  },
  {
    name: 'Change Password',
    path: '/change-password-clinician',
  },
]

const activeStyle: React.CSSProperties = {
  backgroundColor: '#EAFFED',
  borderRadius: '4px',
  color: '#3EB049',
}

export default function ClinicianSideNav() {
  const [, , removeCookie] = useCookies(['userToken'])
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = () => {
    removeCookie('userToken', { path: '/' })
    localStorage.removeItem('userRole')
    navigate('/')
  }
  return (
    <>
      <div className='border h-screen flex flex-col py-8 px-4 gap-6 bg-white shadow'>
        <div className='h-20 w-20'>{<img src={pku} alt='pku' />}</div>

        {navigation.map((navItem) => (
          <NavLink
            key={navItem.name}
            to={
              navItem.path === '/clinician-sideNav'
                ? '/clinician-sideNav/clinician-dashboard'
                : navItem.path
            }
            className='flex border border-gray-300 cursor-pointer px-4 text-lg
               rounded-lg  py-2 text-secondary'
            style={
              location.pathname === navItem.path
                ? activeStyle
                : { backgroundColor: 'white' }
            }
          >
            {navItem.name}
          </NavLink>
        ))}
        <div
          className=' flex gap-4 py-2  rounded-md px-2  border cursor-pointer '
          onClick={handleLogout}
        >
          <img
            src={'https://img.icons8.com/?size=50&id=2445&format=png'}
            alt=''
            className='inline-block  h-6 w-6'
          />
          <p className='font-medium'>Logout</p>
        </div>
      </div>
    </>
  )
}
