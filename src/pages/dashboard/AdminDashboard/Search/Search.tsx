import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/ui/Loader'

const Search = () => {
  const categories = ['AllFoods', 'Enabled', 'Disabled']
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async (isDisabled) => {
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/FoodDetail/GetAll?isDisabled=${isDisabled}&pageNo=${currentPage}&pageSize=16`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const result = await response.json()
    console.log(result)
    console.log(result.result.data.isDisabled)
    return result.result.data
  }

  const {
    data: foods = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['foodData', selectedCategory],
    () =>
      fetchData(
        selectedCategory === categories[0]
          ? ''
          : selectedCategory === categories[1]
            ? 0
            : 1
      ),
    {
      keepPreviousData: true,
    }
  )

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to the first page when the category changes
    refetch()
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    refetch()
  }
  const filteredData = foods
    ? foods.filter((item) =>
        item.leadFoodName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []
  return (
    <div className='py-10 px-10'>
      <div className='px-10 py-10'>
        <h1 className='text-xl font-medium text-white italic'>
          Search BY food Name
        </h1>
      </div>
      <div
        className='rounded-md grid gap-6 mx-10 py-6 bg-white'
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      >
        <div className='flex justify-end px-8 py-2 gap-10'>
          <div
            className='relative border-2 flex border-gray-400 flex-wrap items-stretch
           rounded-md bg-white p-2'
          >
            <input
              type='search'
              className='relative text-lg flex-auto rounded font-normal leading-[1.6] outline-none'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='button-addon1'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className='relative bg-primary flex items-center rounded font-medium shadow-md'
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
                className='bg-primary rounded-2xl px-14 py-2 border font-semibold font-mono text-lg text-white'
              />
            </Link>
            <Button
              title='Edit'
              children=''
              className='bg-white border-2 border-primary rounded-2xl hover:bg-primary hover:text-white px-14 py-2 font-semibold font-mono text-lg text-black'
            />
          </div>
        </div>
        <div className='px-4  rounded flex gap-10 font-normal text-lg  '>
          {categories.map((category) => (
            <button
              key={category}
              className={`
                ${
                  selectedCategory === category
                    ? 'border-b-4 border-green-500'
                    : ''
                }
              text-gray-500`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className=''>
          {isLoading && <Loader />}
          {isError && <p>error fetch data</p>}
          {filteredData && (
            <div className=' bg-white grid grid-cols-4 gap-4 px-2 '>
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`border border-green-900 rounded-md shadow-md bg-white px-4 py-4 grid gap-4
                    
                    ${item.isDisabled ? 'opacity-50' : ''}`}
                >
                  <div className='flex px-4  justify-between '>
                    <img
                      src={item.foodImagepath}
                      alt='food'
                      className=' h-16 w-16'
                    />
                    <img
                      src={`https://pkudev.imobisoft.uk/assets/images/exchangeFree.png`}
                      alt='ex free'
                      className='h-16 w-16'
                    />
                  </div>
                  <div className='flex px-4  justify-between text-gray-500'>
                    <span>{item.leadFoodName}</span>
                    <span>{item.isDisabled.toString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center mt-4  gap-4'>
          <Button
            title='Previous'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            } border px-4 py-2 text-white bg-green-500 rounded`}
            children={''}
          />
          <Button
            title='Next'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={foods.length < 16}
            children={''}
            className={`${
              foods.length < 16 ? 'cursor-not-allowed' : 'cursor-pointer'
            } border px-4 py-2 text-white bg-green-500 rounded`}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
