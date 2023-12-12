import { NavLink, useLocation, Link } from 'react-router-dom'
import pku from '../assets/logopku.jpg'

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Clinician',
    path: '/clinician',
  },
]

const activeStyle: React.CSSProperties = {
  backgroundColor: '#EAFFED',
  borderRadius: '4px',
  color: '#3EB049',
}
export default function PatientSideNav() {
  const location = useLocation()
  return (
    <>
      <div className='flex  flex-col shadow-md  w-[18%] justify-between fixed top-0 z-50  h-screen border border-r-[#EAECF0]'>
        <div className='border border-red-900 py-4 px-4 flex flex-col gap-4'>
          <div className='h-20 w-20'>{<img src={pku} alt='pku' />}</div>

          {navigation.map((navItem) => (
            <NavLink
              key={navItem.name}
              to={`/${navItem.path}`}
              className='flex items-center border cursor-pointer px-1 rounded-lg font-serif py-2 text-sm text-secondary'
              style={
                location.pathname === '/dashboard'
                  ? activeStyle
                  : { backgroundColor: 'white' }
              }
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>
        <Link to='/'>
          <div className=' flex gap-4 py-4 px-4 mb-10 items-center'>
            <img
              src={'https://img.icons8.com/?size=50&id=2445&format=png'}
              alt=''
              className='inline-block  h-6 w-8'
            />
            <p className=' text-black  text-lg font-medium'>Logout</p>
          </div>
        </Link>
      </div>
    </>
  )
}
