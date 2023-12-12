import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../components/button'
import Loader from '../../../../components/ui/Loader'
import { useQuery } from '@tanstack/react-query'

const SubCategories = () => {
  const [show, setShow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const itemsPerPage = 12

  const fetchData = async (page = 1) => {
    console.log(page, 'Fetching')
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/FoodSubCategory/GetAll?pageNo=${page}&pageSize=${itemsPerPage}`
    )
    const data = await response.json()
    console.log(data)
    return data.result.data
  }

  const {
    data: subCategories = [],
    error,
    isLoading,
  } = useQuery(
    ['subCategories', { page: currentPage }],
    () => fetchData(currentPage),
    {
      keepPreviousData: true,
    }
  )

  console.log('error is', error)

  const handleEdit = () => {
    setShow(true)
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])
  const filteredData = subCategories
    ? subCategories.filter((detail) =>
        detail.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []
  return (
    <div className='border px-10 pt-20 grid gap-10'>
      <h1 className='text-xl text-white font-medium italic p-2'>
        Sub Categories
      </h1>

      {isLoading && <Loader />}

      {subCategories && (
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    fillRule='evenodd'
                    d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <div className='flex gap-6'>
              <Link to='/add-newSubCategory'>
                <Button
                  title='+ Add'
                  children=''
                  className='bg-primary rounded-2xl px-14 py-2 border font-semibold
                 font-mono text-lg text-white'
                />
              </Link>
              <Button
                title='Edit'
                children=''
                className='bg-white border-2 border-primary rounded-2xl hover:bg-primary
                 hover:text-white px-14 py-2 font-semibold
                 font-mono text-lg text-black '
                onClick={handleEdit}
              />
            </div>
          </div>

          <div className=' grid gap-4 grid-cols-4 px-6 py-6 rounded-md '>
            {filteredData?.map((detail, index) => (
              <div
                key={index}
                className='border-2 border-gray-400
                 bg-white shadow-md opacity-90 hover:opacity-100 cursor-pointer hover:border-green-600 
                 grid  gap-2 font-serif italic  rounded-md px-2 py-4 overflow-hidden'
              >
                <h4 className='whitespace-normal flex text-lg'>
                  {detail.name}
                </h4>
                <h2 className='h-[5rem] font-bold '>
                  {detail.foodCategoryName}
                </h2>
                {show && (
                  <Link to={`/editSubCategory`}>
                    <div className='w-full  flex justify-end'>
                      <img
                        src={
                          'https://cdn-icons-png.flaticon.com/128/1159/1159633.png'
                        }
                        alt=''
                        className='h-8 w-8 '
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className='inline-flex justify-center'>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={` bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
                currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={subCategories.length === 0}
              className={`${
                subCategories.length === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubCategories
