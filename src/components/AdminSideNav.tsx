import { Link, NavLink, useLocation } from 'react-router-dom'
import pku from '../assets/logopku.jpg'
import navigation from '../../data/Navigation'

const activeStyle = {
  backgroundColor: '#EAFFED',
  color: '#3EB049',
}

const SideNav = () => {
  const location = useLocation()

  return (
    <div className='grid px-4 h-screen py-4 fixed top-0 left-0'>
      <div className='my-2 px-2 py-2'>
        <img src={pku} alt='' className='h-16 w-16' />
      </div>

      {navigation.map((navItem, index) => (
        <div key={index}>
          <NavLink
            to={navItem.path}
            className={`mb-4 flex gap-2 items-center cursor-pointer px-2 
              py-2 text-lg rounded-md text-black font-normal`}
            style={
              location.pathname === navItem.path
                ? activeStyle
                : { backgroundColor: 'white' }
            }
          >
            <img src={navItem.icon} alt={navItem.name} />
            {navItem.name}
          </NavLink>
        </div>
      ))}

      <Link to='/'>
        <div className='mb-8 px-2 py-2 flex gap-2'>
          <img
            src='https://pkudev.imobisoft.uk/assets/icons/logout.svg'
            alt='Logout'
          />
          <span className='text-lg'>Logout</span>
        </div>
      </Link>
    </div>
  )
}

export default SideNav
