import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../../../../utils/auth'
import Loader from '../../../../components/ui/Loader'

const Assesments = () => {
  // const [selectedPatient, setSelectedPatient] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  // const [showPatientDetails, setShowPatientDetails] = useState(false)
  const queryKey = 'assessment'
  const authToken = getAuthToken()
  const itemsPerPage = 10

  const fetchPatients = async (page) => {
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/Assessment/GetAll?pageNo=${page}&pageSize=${itemsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return data.result.data
  }

  const {
    data: Assessments = [],
    isLoading,
    // isError,
    refetch,
  } = useQuery([queryKey, currentPage], () => fetchPatients(currentPage), {
    keepPreviousData: true,
    onSuccess: (data) => {
      console.log(data, 'assessments')
    },
  })

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  // const handleViewDetails = (assessments) => {
  //   setSelectedPatient(assessments)
  //   setShowPatientDetails(true)
  // }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className='mx-10 grid gap-10 py-16 '>
      {isLoading && <Loader />}
      <h1 className='text-lg font-medium text-white'>Assesments</h1>

      <div className='bg-white rounded-md flex flex-col gap-10 px-4 pt-6'>
        <div className='flex justify-end py-2 gap-10'>
          <div className='relative border flex flex-wrap items-stretch rounded-md bg-white p-2'>
            <input
              type='search'
              className='relative text-lg flex-auto rounded font-normal  outline-none'
              placeholder='Search'
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
        </div>

        <div className='grid gap-2 py-4 rounded-md w-full px-3'>
          <div className='bg-slate-100 rounded-md grid grid-cols-4 text-lg font-mono px-4 py-4'>
            <span className='flex justify-center'>Name</span>
            <span className='flex justify-center'>Email</span>
            <span className='flex justify-center'>Submission Date</span>
            <span className='flex justify-center'>Action</span>
          </div>

          {Assessments.map((assessments) => (
            <div
              key={assessments.id}
              className='border-b-gray-400 border-b text-uppercase font-normal grid grid-cols-4 text-lg text-gray-700 py-2 w-full'
            >
              <span className='flex justify-center px-2r'>
                {assessments.userName}
              </span>
              <span className='flex justify-center px-2'>
                {assessments.email}
              </span>
              <span className='flex justify-center px-2'>
                {assessments.submissionDate}
              </span>

              <span className='flex px-2 justify-center gap-6'>
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SuOi1W5JwZSl_MNN17YI5MO0VI8auWQWosYb-jeLEQ&s`}
                  alt=''
                  height={20}
                  width={20}
                  color='yell0w'
                />
                <img
                  src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/862px-Delete-button.svg.png`}
                  alt=''
                  height={20}
                  width={20}
                />
              </span>
            </div>
          ))}

          {Assessments.length === 0 && (
            <div className='border h-[500px] flex justify-center items-center'>
              <h1 className='text-xl text-gray-400 font-medium'>
                No Records Found
              </h1>
            </div>
          )}

          <div className='inline-flex justify-center'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
            >
              Previous
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={Assessments.length === 0}
              className={`${
                Assessments.length === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assesments
