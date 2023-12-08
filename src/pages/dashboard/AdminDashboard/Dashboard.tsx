import { Link } from 'react-router-dom'
import food from '../../../assets/food.svg'
import subcategory from '../../../assets/sub-categories.svg'
const Dashboard = () => {
  const menu = [
    {
      id: 1,
      image: `${food}`,
      name: 'Categoreies',
      path: '/categories',
    },
    {
      id: 2,
      image: `${subcategory}`,
      path: '/sub-categories',
      name: 'SubCategories',
    },
    {
      id: 3,
      image: 'https://pkudev.imobisoft.uk/assets/images/search.svg',
      name: 'Food ',
      path: '/search-by-food',
    },
    {
      id: 4,
      image: 'https://pkudev.imobisoft.uk/assets/images/clinician.svg',
      name: ' Clinicians',
      path: '/clinicians',
    },
    {
      id: 5,
      image: 'https://pkudev.imobisoft.uk/assets/images/assesmnt.svg',
      name: 'Patients',
      path: '/patients',
    },
    {
      id: 6,
      image: 'https://pkudev.imobisoft.uk/assets/images/patient.svg',
      name: 'Asessments',
      path: '/asessments',
    },
  ]
  return (
    <div className='grid  py-36 '>
      <h1 className='text-2xl font-medium p-4 text-white italic'>Dashboard</h1>
      <div className='border bg-white grid   px-8 py-12  rounded-md mx-auto '>
        <div className='grid grid-cols-3 gap-4 '>
          {menu.map((menuitem, index) => (
            <Link to={`${menuitem.path}`} key={index}>
              <div className='bg-white border  flex gap-4 items-center p-4  shadow-md rounded-lg '>
                <span className=''>
                  <img src={menuitem.image} alt='' className='' />
                </span>
                <span className='text-center text-xl font-serif italic'>
                  {menuitem.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
