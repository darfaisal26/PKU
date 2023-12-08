import { Link } from 'react-router-dom'
import Button from '../../../../components/button'
import Loader from '../../../../components/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const Categories = () => {
  // Define the function to fetch data

  const fetchData = async () => {
    const response = await fetch(
      'https://pkudevapi.imobisoft.uk/api/FoodCategory/GetAll?pageNo=1&pageSize=1000'
    )
    const data = await response.json()
    return data.result.data
  }

  // Use the useQuery hook
  const { data, error, isLoading } = useQuery([], fetchData)

  // Log the response to the console
  console.log('Data:', data)
  console.log('Error:', error)
  console.log('Loading:', isLoading)

  useEffect(() => {
    fetchData()
  }, [])
  // Render your component
  return (
    <div className='border px-10 pt-20 grid gap-10'>
      <h1 className='text-xl text-white font-medium italic p-2'>Categories</h1>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {data && (
        <div className='border-2 rounded-md bg-white grid gap-10 px-4 py-4'>
          <div className='flex justify-end px-8 py-2 gap-10'>
            <div className='relative border-2 flex border-gray-400  flex-wrap items-stretch  rounded-md bg-white p-2'>
              <input
                type='search'
                className='relative  text-lg flex-auto rounded font-normal leading-[1.6] 
                outline-none'
                placeholder='Search'
                aria-label='Search'
                aria-describedby='button-addon1'
              />

              <button
                className='relative  bg-primary flex items-center rounded   font-medium  shadow-md '
                type='button'
                id='button-addon1'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='white'
                  className='h-7 w-7'
                >
                  <path
                    fill-rule='evenodd'
                    d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                    clip-rule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <div className='flex gap-6'>
              <Link to={'/add-newCategory'}>
                <Button
                  title={'+ Add'}
                  children={''}
                  className='bg-primary rounded-2xl px-14 py-2 border font-semibold
                 font-mono text-lg text-white'
                />
              </Link>
              <Link to={''}>
                <Button
                  title={'Edit'}
                  children={''}
                  className='bg-white border-2 border-primary rounded-2xl hover:bg-primary
                 hover:text-white px-14 py-2 font-semibold
                 font-mono text-lg text-black '
                />
              </Link>
            </div>
          </div>
          <div className=' grid gap-4 grid-cols-4 px-6 py-6 rounded-md '>
            {data.map((detail, index) => (
              <div
                key={index}
                className='border-2 border-gray-400 bg-white shadow-md opacity-90 hover:opacity-100 cursor-pointer hover:border-green-600 
                 grid gap-2 font-serif italic  rounded-md px-2 py-4 overflow-hidden'
              >
                <span className='h-[5rem] '>
                  <img
                    src={detail.foodCategoryImagepath}
                    alt='img'
                    className='h-[5rem] w-[5rem] object-cover'
                  />
                </span>
                <h4 className='whitespace-normal flex text-lg'>
                  {detail.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
