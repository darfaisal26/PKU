import React from 'react'
import { Link } from 'react-router-dom'
import foodImage from '../../../assets/food.svg'
import subcategoryImage from '../../../assets/sub-categories.svg'

const Dashboard = () => {
  const menuItems = [
    { id: 1, image: foodImage, name: 'Categories', path: '/categories' },
    {
      id: 2,
      image: subcategoryImage,
      name: 'Subcategories',
      path: '/sub-categories',
    },
    {
      id: 3,
      image: 'https://pkudev.imobisoft.uk/assets/images/search.svg',
      name: 'Food',
      path: '/search-by-food',
    },
    {
      id: 4,
      image: 'https://pkudev.imobisoft.uk/assets/images/clinician.svg',
      name: 'Clinicians',
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
      name: 'Assessments',
      path: '/assessments',
    },
  ]

  return (
    <div className='grid py-40 border-2'>
      <h1 className='text-2xl font-medium p-4 text-white italic'>Dashboard</h1>
      <div className='border bg-white grid px-8 py-16 rounded-md mx-auto'>
        <div className='grid grid-cols-3 gap-4'>
          {menuItems.map(({ id, image, name, path }) => (
            <Link to={path} key={id}>
              <div className=' flex gap-4  items-center border px-4 py-4 rounded shadow-sm'>
                <img src={image} alt='' className='' />
                <span className='text-center text-xl font-serif italic'>
                  {name}
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
