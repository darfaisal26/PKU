import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAuthToken } from '../../../../utils/auth'
import Button from '../../../../components/button'
import Loader from '../../../../components/ui/Loader'
import SearchBar from './Searchbar'
import ClinicianListItem from './ClinicianListItem'
import DeleteConfirmation from './DeleteConfirmation'

type Clinician = {
  id: number
  fullName: string
  email: string
}

const Clinicians = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [ShowDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedClinicianId, setSelectedClinicianId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const queryKey = 'clinicians'
  const authToken = getAuthToken()
  const itemperPage = 10

  const fetchClinicians = async (currentPage, itemperPage, authToken) => {
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/Clinician/GetClinicians?pageNo=${currentPage}&pageSize=${itemperPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result.data
  }

  const {
    data: Clinicians = [],
    isLoading,
    refetch,
  } = useQuery(
    [queryKey, currentPage],
    () => fetchClinicians(currentPage, itemperPage, authToken),
    {
      keepPreviousData: true,
      staleTime: 30000,
      onError: (error) => {
        console.error('An error occurred while fetching data:', error)
      },
      onSuccess(data) {
        console.log(data)
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const showDeleteView = (id) => {
    setSelectedClinicianId(id)
    setShowDeletePopup(true)
  }

  const hideDeleteViewPopUp = () => {
    setSelectedClinicianId(null)
    setShowDeletePopup(false)
  }

  const handleDeleteClinician = async () => {
    try {
      await fetch(
        `https://pkudevapi.imobisoft.uk/api/Clinician/DeleteClinician?Id=${selectedClinicianId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      refetch()
      hideDeleteViewPopUp()
    } catch (error) {
      console.error(error)
    }
  }

  const filteredClinicians = Clinicians?.filter((clinician: Clinician) =>
    Object.values(clinician).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className='mx-10 grid gap-10 py-16'>
      {isLoading && <Loader />}
      <h1 className='text-lg font-medium text-white'>Clinician</h1>

      <div className='bg-white rounded-md flex flex-col gap-10 px-4 pt-6'>
        <div className='flex justify-end py-2 gap-10'>
          <SearchBar setSearchQuery={setSearchQuery} />
          <div className='flex gap-6'>
            <Link to='/add-clinician'>
              <Button
                title='+ Add'
                children=''
                className='bg-primary rounded-2xl px-14 py-2 border font-semibold font-mono text-lg text-white'
              />
            </Link>
          </div>
        </div>
        <div className='border grid gap-2 py-4 rounded-md w-full px-3 '>
          <div className='bg-slate-100 rounded-md flex justify-between text-lg font-mono px-4 py-4'>
            <span>Name </span>
            <span>Email</span>
            <span>Action</span>
          </div>

          {/* Clinician list items */}
          {filteredClinicians?.map((clinician) => (
            <ClinicianListItem
              key={clinician.id}
              clinician={clinician}
              showDeleteView={showDeleteView}
              authToken={authToken}
              refetch={refetch}
            />
          ))}
          {/* if there is no length */}
          {Clinicians.length === 0 && (
            <div className='border h-[500px] flex justify-center items-center'>
              <h1 className='text-xl text-gray-400 font-medium'>
                No Records Found
              </h1>
            </div>
          )}

          {/* Delete popup */}

          {ShowDeletePopup && (
            <DeleteConfirmation
              onCancel={hideDeleteViewPopUp}
              onConfirm={handleDeleteClinician}
            />
          )}
          {/* pagination */}
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
              disabled={Clinicians.length === 0}
              className={`${
                Clinicians.length === 0
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

// const ClinicianListItem = ({
//   clinician,
//   showDeleteView,
//   authToken,
//   refetch,
// }) => {
//   const [showUpdatePopup, setShowUpdatePopup] = useState(false)
//   const [firstName, setFirstName] = useState(clinician.firstName)
//   const [surName, setSurName] = useState(clinician.surName)
//   const [selectEditId, setSelectEditId] = useState('')

//   const editClinicianMutation = useMutation(
//     ({
//       id,
//       firstName,
//       surName,
//     }: {
//       id: string
//       firstName: string
//       surName: string
//     }) =>
//       fetch(`https://pkudevapi.imobisoft.uk/api/Clinician/EditClinician`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id,
//           firstName,
//           surName,
//         }),
//       }),
//     {
//       onSuccess: async () => {
//         setShowUpdatePopup(false)
//         refetch()
//         console.log(
//           'ClinicianListItem - Clinicians refetched',
//           selectEditId,
//           firstName,
//           surName
//         )
//       },
//     }
//   )

//   // useEffect(() => {
//   //   if (editClinicianMutation.isSuccess) {
//   //     refetch()
//   //   }
//   // }, [editClinicianMutation.isSuccess, refetch])
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     editClinicianMutation.mutate({
//       id: selectEditId,
//       firstName,
//       surName,
//     })
//   }

//   function ShowUpdate(id) {
//     setShowUpdatePopup(true)
//     setSelectEditId(id)
//   }

//   return (
//     <div>
//       <div className='border-b-gray-400 border-b text-uppercase font-normal flex justify-between text-lg text-gray-700 py-2 w-full'>
//         <span className='flex justify-start px-2'>{clinician.fullName}</span>
//         <span className='flex justify-start px-2'>{clinician.email}</span>
//         <div className='flex gap-4 items-center px-2'>
//           <span
//             className='hover:bg-gray-300 rounded p-1'
//             onClick={() => ShowUpdate(clinician.id)}
//           >
//             <Edit2Icon />
//           </span>
//           {/* Add your delete logic here */}

//           <span
//             className='hover:bg-gray-300 rounded p-1'
//             onClick={() => showDeleteView(clinician.id)}
//           >
//             <img
//               src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/862px-Delete-button.svg.png`}
//               alt=''
//               height={20}
//               width={20}
//             />
//           </span>
//         </div>
//       </div>
//       {showUpdatePopup && (
//         <>
//           {/* Overlay */}
//           <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
//           {/* Update Form */}
//           <form className='max-w-md w-[50%] mx-auto bg-white p-8 rounded-md shadow-md z-50 fixed top-[30%] left-[40%]'>
//             <h2 className='text-2xl font-bold mb-4'>Update Clinician</h2>

//             {/* First Name Input */}
//             <div className='mb-4'>
//               <label
//                 className='block text-gray-700 text-sm font-bold mb-2'
//                 htmlFor='firstName'
//               >
//                 First Name
//               </label>
//               <input
//                 className='w-full border rounded-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline'
//                 id='firstName'
//                 type='text'
//                 placeholder='Enter First Name'
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>

//             {/* SurName Input */}
//             <div className='mb-6'>
//               <label
//                 className='block text-gray-700 text-sm font-bold mb-2'
//                 htmlFor='surName'
//               >
//                 SurName
//               </label>
//               <input
//                 className='w-full border rounded-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline'
//                 id='surName'
//                 type='text'
//                 placeholder='Enter SurName'
//                 value={surName}
//                 onChange={(e) => setSurName(e.target.value)}
//               />
//             </div>

//             {/* Update Button */}
//             <div className='flex items-center justify-center'>
//               <Button
//                 onClick={handleSubmit}
//                 title='Update'
//                 className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                 children={''}
//               />
//             </div>
//           </form>
//         </>
//       )}
//     </div>
//   )
// }
export default Clinicians
