import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/ui/Loader'

const Search = () => {
  const categories = ['AllFoods', 'Enabled', 'Disabled']
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const fetchData = async (isDisabled) => {
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/FoodDetail/GetAll?isDisabled=${isDisabled}&pageNo=1&pageSize=10`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const result = await response.json()
    console.log(result)
    return result.result.data
  }

  const {
    data: result = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(['foodData', selectedCategory], () =>
    fetchData(
      selectedCategory === categories[0]
        ? ''
        : selectedCategory === categories[1]
          ? 0
          : 1
    )
  )

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    refetch()
  }

  return (
    <div className='border border-red-900 py-10 px-10'>
      <div>
        <h1 className='text-lg font-normal'>Search BY food Name</h1>
      </div>
      <div className='border grid gap-6 mx-10 mt-6 bg-white'>
        <div className='flex justify-end px-8 py-2 gap-10'>
          <div className='relative border-2 flex border-gray-400 flex-wrap items-stretch rounded-md bg-white p-2'>
            <input
              type='search'
              className='relative text-lg flex-auto rounded font-normal leading-[1.6] outline-none'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='button-addon1'
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
        <div>
          <div className='px-4 pt-4 rounded flex gap-10 font-normal text-lg border'>
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? 'border-b-2 border-green-500'
                    : ''
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className='border'>
            {isLoading && <Loader />}
            {isError && <p>error fetch data</p>}
            {result && (
              <div className='border bg-warning grid grid-cols-4'>
                {result.map((item) => (
                  <div
                    key={item.id}
                    className='border border-green-900 px-4 py-8'
                  >
                    <div>
                      <img src={item.foodImagepath} alt='' />
                      <img src='' alt='' />
                    </div>
                    <span>{item.leadFoodName}</span>
                    <span>{item.isDisabled}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
