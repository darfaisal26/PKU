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
    path: '/asessments',
  },
  {
    name: 'Change password',
    path: '/change-password',
  },
]

const activeStyle: React.CSSProperties = {
  backgroundColor: '#EAFFED',
  color: '#3EB049',
}

export default function SideNav() {
  const location = useLocation()

  return (
    <>
      <div className=''>
        <div className=' grid  px-4 h-screen py-4'>
          <div className='my-4 px-2 py-2'>
            <img src={pku} alt='' className='h-20 w-20' />
          </div>

          {navigation.map((navItem, index) => (
            <div key={index}>
              <NavLink
                to={`${navItem.path}`}
                className='mb-4 flex  items-center cursor-pointer px-2   py-2  text-lg  rounded-md text-black font-normal'
                style={
                  location.pathname === navItem.path
                    ? activeStyle
                    : { backgroundColor: 'white' }
                }
              >
                {navItem.name}
              </NavLink>
            </div>
          ))}

          <Link to='/'>
            <div className='mb-8'>
              <span className='text-lg  text-green'>Logout</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
