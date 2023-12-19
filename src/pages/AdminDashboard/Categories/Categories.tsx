import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Button from '../../../components/button'
import Loader from '../../../components/ui/Loader'
import { Loader2 } from 'lucide-react'
// import UpdateCategory from './UpdateCategory'

const BASE_URL = 'https://pkudevapi.imobisoft.uk/api'

const fetchData = async (pageNo, pageSize) => {
  const response = await fetch(
    `${BASE_URL}/FoodCategory/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`
  )
  const data = await response.json()
  return data.result.data
}

const Categories = () => {
  const navigate = useNavigate()
  type CategoriesState = {
    showEditIcon: boolean
    searchQuery: string
    currentPage: number
  }

  // Use the defined types for your state variables
  const [state, setState] = useState<CategoriesState>({
    showEditIcon: false,
    searchQuery: '',
    currentPage: 1,
  })
  // const [selectedid, setSelectedid] = useState()

  const { data, isLoading, isFetching } = useQuery(
    ['categories', state.currentPage],
    () => fetchData(state.currentPage, 16),
    { keepPreviousData: true }
  )

  const handleEdit = () => {
    // Use the spread operator to update the state
    setState((prevState) => ({
      ...prevState,
      showEditIcon: true,
    }))
  }

  const navigateToEdit = (id: number) => {
    console.log(id, ' is edit id')
    // setSelectedid(id)
    navigate(`/editCategory/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    if (!isFetching) {
      // Use the spread operator to update the state
      setState((prevState) => ({
        ...prevState,
        currentPage: newPage,
      }))
    }
  }

  const filteredData = data
    ? data.filter((detail) =>
        detail.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    : []

  return (
    <div className='border px-10 py-20 grid gap-6'>
      <h1 className='text-xl text-white font-medium italic p-2'>Categories</h1>
      {isLoading && <Loader />}
      {data && (
        <div
          className='border-2 rounded-md bg-white grid gap-2 px-4 py-4'
          style={{ maxHeight: '500px', overflowY: 'auto' }}
        >
          {/* search inputs and buttons */}
          <div className='flex justify-end px-8 py-2 gap-4 '>
            <div className='relative border-2 flex border-gray-400 flex-wrap items-stretch rounded-md bg-white p-2'>
              <input
                type='search'
                placeholder='Search'
                value={state.searchQuery}
                className='text-lg flex-auto rounded font-normal leading-[1.6]
                outline-none'
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    searchQuery: e.target.value,
                  }))
                }
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
              <Link to={'/add-newCategory'}>
                <Button
                  title={'+ Add'}
                  className='bg-primary rounded-2xl px-14 py-2 border font-semibold
                     font-mono text-lg text-white'
                  children={''}
                />
              </Link>
              <Button
                title={'Edit'}
                className='bg-white border-2 border-primary rounded-2xl hover:bg-primary
                     hover:text-white px-14 py-2 font-semibold
                     font-mono text-lg text-black '
                onClick={handleEdit}
              >
                <img
                  src={
                    'https://cdn-icons-png.flaticon.com/128/1159/1159633.png'
                  }
                  alt='no'
                  className='h-6 w-6 text-gray-400 border-red-500'
                />
              </Button>
            </div>
          </div>
          {/* main data */}
          <div className='grid gap-4 grid-cols-4 px-6 py-6 rounded-md  '>
            {filteredData.map((detail, index) => (
              <div
                key={index}
                className='border-2 border-gray-400 bg-white shadow-md opacity-90 hover:opacity-100
                 cursor-pointer hover:border-green-600 
                 grid gap-2 font-serif italic rounded-lg p-4 overflow-hidden'
              >
                <span className='h-[5rem] '>
                  <img
                    src={detail.foodCategoryImagepath}
                    alt='img'
                    className='h-[5rem] w-[5rem] object-cover'
                  />
                </span>
                <h4 className='whitespace-normal flex text-lg break-all'>
                  {detail.name}
                </h4>
                {state.showEditIcon && (
                  <>
                    <div
                      className='w-full grid justify-end group '
                      onClick={() => navigateToEdit(detail.id)}
                    >
                      <img
                        src={
                          'https://cdn-icons-png.flaticon.com/128/1159/1159633.png'
                        }
                        alt=''
                        className='h-6 w-6 text-gray-400 '
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {/* pagination buttons */}

          <div className='inline-flex justify-center gap-4'>
            <button
              onClick={() => handlePageChange(state.currentPage - 1)}
              disabled={state.currentPage === 1 || isFetching}
              className={`${
                state.currentPage === 1 || isFetching
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } border px-4 py-2 text-white bg-green-500 rounded`}
            >
              {isFetching ? (
                <Loader2 className='h-6 w-6 animate-spin  text-red-700' />
              ) : (
                'Previous'
              )}
            </button>
            <button
              title={`$`}
              onClick={() => handlePageChange(state.currentPage + 1)}
              disabled={data.length < 10 || isFetching}
              className={`${
                data.length < 10 || isFetching
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } border px-4 py-2 text-white bg-green-500 rounded`}
            >
              {isFetching ? (
                <Loader2 className='h-6 w-6 animate-spin  text-red-700' />
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
