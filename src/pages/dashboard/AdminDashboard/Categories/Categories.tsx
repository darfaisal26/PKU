import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../components/button'
import Loader from '../../../../components/ui/Loader'
import { useQuery } from '@tanstack/react-query'

const fetchData = async () => {
  const response = await fetch(
    'https://pkudevapi.imobisoft.uk/api/FoodCategory/GetAll?pageNo=1&pageSize=1000'
  )
  const data = await response.json()
  console.log(data)
  return data.result.data
}

const Categories = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const { data, error, isLoading } = useQuery([], fetchData)

  const handleEdit = () => {
    setShow(true)
  }

  const navigateToEdit = () => {
    navigate('/editCategory')
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (error) {
    return <h1>loading error</h1>
  }
  return (
    <div className='border px-10 pt-20 grid gap-10'>
      <h1 className='text-xl text-white font-medium italic p-2'>Categories</h1>
      {isLoading && <Loader />}
      {data && (
        <div className='border-2 rounded-md bg-white grid gap-10 px-4 py-4'>
          <div className='flex justify-end px-8 py-2 gap-10'>
            <div className='relative border-2 flex border-gray-400  flex-wrap items-stretch  rounded-md bg-white p-2'>
              <input
                type='search'
                className='relative text-lg flex-auto rounded font-normal leading-[1.6] 
                  outline-none'
                placeholder='Search'
                aria-label='Search'
                aria-describedby='button-addon1'
              />
              <button
                className='relative bg-primary flex items-center rounded font-medium  shadow-md '
                type='button'
                id='button-addon1'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='white'
                  className='h-7 w-7'
                >
                  {/* SVG path */}
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
              <Button
                children={''}
                title={'Edit'}
                className='bg-white border-2 border-primary rounded-2xl hover:bg-primary
                     hover:text-white px-14 py-2 font-semibold
                     font-mono text-lg text-black '
                onClick={handleEdit}
              />
            </div>
          </div>
          <div className=' grid gap-4 grid-cols-4 px-6 py-6 rounded-md '>
            {data.map((detail, index) => (
              <div
                key={index}
                className='border-2 border-gray-400 bg-white shadow-md opacity-90 hover:opacity-100 cursor-pointer hover:border-green-600 
                   grid gap-2 font-serif italic rounded-md px-2 py-4 overflow-hidden'
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
                {show && (
                  <div
                    className='w-full  flex justify-end'
                    onClick={navigateToEdit}
                  >
                    <img
                      src={
                        'https://cdn-icons-png.flaticon.com/128/1159/1159633.png'
                      }
                      alt=''
                      className='h-8 w-8 '
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
