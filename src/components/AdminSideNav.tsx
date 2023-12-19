import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import pku from '../assets/logopku.jpg'
import navigation from '../../data/Navigation'
import { useCookies } from 'react-cookie'
const activeStyle: React.CSSProperties = {
  backgroundColor: '#EAFFED',
  color: '#3EB049',
}

export default function SideNav() {
  const location = useLocation()
  const [, , removeCookie] = useCookies(['userToken'])
  const navigate = useNavigate()

  const handleLogout = () => {
    removeCookie('userToken', { path: '/' })
    navigate('/')
  }

  return (
    <div className=' grid px-4 h-screen py-4 fixed top-0 left-0 '>
      <div className='my-2 px-2 py-2'>
        <Link to={'/dashboard'}>
          <img src={pku} alt='' className='h-16 w-16' />
        </Link>
      </div>

      {navigation.map((navItem, index) => (
        <div key={index}>
          <NavLink
            to={navItem.path === '/admin-sideNav' ? '/dashboard' : navItem.path}
            className='mb-4 flex gap-2 items-center cursor-pointer px-2 
                py-2  text-lg border rounded-md text-black font-normal'
            style={
              location.pathname === navItem.path
                ? activeStyle
                : { backgroundColor: 'white' }
            }
          >
            <img src={navItem.icon} alt='' height={20} width={20}></img>
            {navItem.name}
          </NavLink>
        </div>
      ))}

      <div className=' flex gap-2 px-2 ' onClick={handleLogout}>
        <img
          src='https://pkudev.imobisoft.uk/assets/images/logout.png'
          className='h-6 '
        ></img>
        <span className='text-lg'>Logout</span>
      </div>
    </div>
  )
}
