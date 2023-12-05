import { Link, NavLink, useLocation } from 'react-router-dom'
import pku from '../assets/logopku.jpg'

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Categories',
    path: '/categories',
  },
  {
    name: 'Sub-Categories',
    path: '/sub-categories',
  },
  {
    name: 'Search by food name',
    path: '/search-by-food',
  },
  {
    name: 'Clinicians',
    path: '/clinicians',
  },
  {
    name: 'Patients',
    path: '/patients',
  },
  {
    name: 'Assessments',
    path: '/assessments',
  },
  {
    name: 'Change password',
    path: '/change-password',
  },
]

const activeStyle: React.CSSProperties = {
  backgroundColor: '#EAFFED',
  borderRadius: '4px',
  color: '#3EB049',
}

export default function SideNav() {
  const location = useLocation()

  return (
    <>
      <div className='shadow-xl  justify-between w-[20%]'>
        <div className='bg-white grid  px-4 h-screen py-4'>
          <div className='my-4  px-2 py-2'>
            <img src={pku} alt='' className='h-20 w-20' />
          </div>

          {navigation.map((navItem) => (
            <NavLink
              key={navItem.name}
              to={`/${navItem.name}`}
              className='mb-4 flex  items-center cursor-pointer px-2   py-2 border text-[18px]  rounded text-black font-mono'
              style={
                location.pathname === navItem.path
                  ? activeStyle
                  : { backgroundColor: 'white' }
              }
            >
              {/* <img
                src={`${
                  location.pathname === navItem.path ? activeIcon : navItem.icon
                }`}
                alt=''
                className='mx-2 w-6 h-6'
              /> */}
              {navItem.name}
            </NavLink>
          ))}

          <Link to='/'>
            <div className='mb-10'>
              {/* <img src={logout} alt='' className='inline-block mx-2' /> */}
              <p className='text-[20px] text-secondary inline-block'>Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
