import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAuthToken } from '../../../../utils/auth'
import { Edit2Icon, LucideDelete } from 'lucide-react'
import Button from '../../../../components/button'
import Loader from '../../../../components/ui/Loader'
import Input from '../../../../components/Input'

const Clinicians = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [ShowEditDialog, setShowEditDialog] = useState(false)
  const [ShowDeletePopup, setShowDeletePopup] = useState(false)
  const queryKey = 'clinicians'
  const authToken = getAuthToken()
  // const navigate = useNavigate()
  const itemperPage = 10
  const {
    data: Clinicians,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    [queryKey, currentPage],
    async () => {
      const response = await fetch(
        `https://pkudevapi.imobisoft.uk/api/Clinician/GetClinicians?pageNo=${currentPage}&pageSize=${itemperPage}`,

        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data.result.data
    },
    {
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isError) {
    return <p>Error loading data</p>
  }
  if (!Clinicians || !Array.isArray(Clinicians)) {
    console.error('Clinicians data is not an array:', Clinicians)
    return null // Or handle the error in another way
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  function handletEditClinician(id) {
    setShowEditDialog(true)
    console.log(id, 'is id')
  }
  function handleDeleteClinician(id) {
    setShowDeletePopup(true)
    console.log(id, 'is id')
  }

  return (
    <div className='mx-10 grid gap-10  py-16'>
      {isLoading && <Loader />}
      <h1 className=' text-lg font-medium text-white'>Clinician</h1>

      <div className='bg-white rounded-md flex flex-col gap-10  px-4 pt-6'>
        <div className='flex  justify-end py-2 gap-10'>
          <div className='relative border  flex  flex-wrap items-stretch  rounded-md bg-white p-2'>
            <input
              type='search'
              className='relative  text-lg flex-auto rounded font-normal leading-[1.6] 
              outline-none'
              placeholder='Search'
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
            <Link to='/add-clinician'>
              <Button
                title='+ Add'
                children=''
                className='bg-primary rounded-2xl px-14 py-2 border font-semibold
              font-mono text-lg text-white'
              />
            </Link>
          </div>
        </div>
        <div className='border grid gap-2 py-4 rounded-md w-full px-3 '>
          <div className=' bg-slate-100 rounded-md flex justify-between text-lg font-mono px-4 py-4'>
            <span>Name </span>
            <span>Email</span>
            <span>Action</span>
          </div>

          {Clinicians.map((clinician) => (
            <div
              key={clinician.id}
              className='border-b-gray-400 border-b  text-uppercase font-normal 
             flex justify-between text-lg text-gray-700  py-2 w-full'
            >
              <span className='flex justify-start  px-2'>
                {clinician.fullName}
              </span>
              <span className='flex justify-start px-2'>{clinician.email}</span>
              <div className='flex gap-4 items-center  px-2'>
                <span
                  className='hover:bg-gray-300 rounded p-1'
                  onClick={() => handletEditClinician(clinician.id)}
                >
                  <Edit2Icon />
                </span>
                <span
                  className='hover:bg-gray-300 rounded p-1'
                  onClick={() => handleDeleteClinician(clinician.id)}
                >
                  <LucideDelete />
                </span>
              </div>
            </div>
          ))}
          {Clinicians.length === 0 && (
            <div className='border h-[500px] flex justify-center items-center'>
              <h1 className='text-xl text-gray-400 font-medium'>
                No Records Found
              </h1>
            </div>
          )}
          {/* Edit box  form */}
          {ShowEditDialog && (
            <>
              <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
              <div className='border px-4 py-6 grid gap-6 rounded-md border-blue-900  bg-white z-50 w-[25%] fixed top-[30%] left-[45%]'>
                <h1 className='text-lg font-normal font-serif'>
                  Update clinician
                </h1>

                <div className='grid gap-6'>
                  <div className='border rounded px-4 py-4'>
                    <Input
                      id={''}
                      name={''}
                      type={'text'}
                      placeholder={'Firstname'}
                      required={false}
                      className='w-full '
                    />
                  </div>
                  <div className='border rounded px-4 py-4'>
                    <Input
                      id={''}
                      name={''}
                      type={'text'}
                      placeholder={'Lastname'}
                      required={false}
                      className='w-full '
                    />
                  </div>
                </div>

                <div className='flex justify-end px-4'>
                  <Button
                    onClick={() => setShowEditDialog(false)}
                    title={'Update'}
                    children={''}
                    className='bg-primary px-4 py-2 text-white rounded'
                  />
                </div>
              </div>
            </>
          )}

          {/* Delete poup  */}
          {ShowDeletePopup && (
            <>
              <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
              <div className='bg-white grid gap-6 z-50  rounded-md fixed top-[30%] left-[45%] px-6 py-8'>
                <div className=' flex flex-col gap-2 justify-center items-center  px-4 py-2'>
                  <div className='border-4 border-yellow-500 w-20 h-20 rounded-[50%]'></div>
                  <h1 className='text-2xl font-medium'>Confirm</h1>
                  <p className='text-gray-500 font-normal text-lg'>
                    Are you sure you want to delete this clinician?
                  </p>
                </div>
                <div className='flex justify-between'>
                  <Button
                    onClick={() => setShowDeletePopup(false)}
                    title={'cancel'}
                    children={''}
                    className='text-gray-500 hover:bg-slate-500 hover:text-white text-lg border rounded px-4 py-2'
                  />
                  <Button
                    title={'confirm'}
                    children={''}
                    className='text-white text-lg bg-yellow-500 rounded px-4 py-2'
                  />
                </div>
              </div>
            </>
          )}

          <div className='flex justify-center gap-6'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='bg-primary px-4 py-2 text-white font-normal rounded'
            >
              Previous
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={Clinicians.length === 0}
              className={`${
                Clinicians.length === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-primary px-4 py-2 text-white font-normal rounded`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clinicians
