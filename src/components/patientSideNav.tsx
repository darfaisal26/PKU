// import SideNavLogo from '../assets/image 2.png'
// import icon from '../assets/Group.png'
import { NavLink, useLocation } from 'react-router-dom'
// import logout from '../assets/logout.svg'
import { Link } from 'react-router-dom'
// import activeIcon from '../assets/Frame2.png'

const navigation = [
  {
    name: 'Manage Appointments',
    // icon: icon,
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
      <div className='flex flex-col w-[17%] justify-between px-4 fixed top-0 z-50  h-screen shadow-custom border border-r-[#EAECF0] bg-white'>
        <div className=''>
          <div className='my-5'>{/* <img src={SideNavLogo} alt='' /> */}</div>

          {navigation.map((navItem) => (
            <NavLink
              key={navItem.name}
              to={`/${navItem.name.toLowerCase().replace(' ', '-')}`}
              className='mb-4 flex items-center cursor-pointer  py-2 text-sm text-secondary'
              style={
                location.pathname === '/book-appointment' ||
                location.pathname === '/manage-appointments'
                  ? activeStyle
                  : { backgroundColor: 'white' }
              }
            >
              {/* <img
                src={
                  location.pathname === '/manage-appointments' ||
                  location.pathname === '/book-appointment'
                    ? activeIcon
                    : ''
                }
                alt=''
                className='mx-2 w-6 h-6'
              /> */}
              {navItem.name}
            </NavLink>
          ))}
          <NavLink
            to='/parent-support'
            className={
              'mb-4 flex items-center cursor-pointer  py-2 text-sm text-secondary'
            }
            style={({ isActive }) =>
              isActive ? activeStyle : { backgroundColor: 'white' }
            }
          >
            {/* <img
              src={location.pathname === '/parent-support' ? activeIcon : icon}
              alt=''
              className='mx-2 w-6 h-6 inline-block'
            /> */}
            Support
          </NavLink>
        </div>
        <Link to='/'>
          <div className='mb-10'>
            {/* <img src={} alt='' className='inline-block mx-2' /> */}
            <p className='text-sm text-secondary inline-block'>Logout</p>
          </div>
        </Link>
      </div>
    </>
  )
}
