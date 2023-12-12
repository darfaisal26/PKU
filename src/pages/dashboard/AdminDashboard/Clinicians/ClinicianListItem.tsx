import { Edit2Icon } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../components/button'

const ClinicianListItem = ({
  clinician,
  showDeleteView,
  authToken,
  refetch,
}) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [firstName, setFirstName] = useState(clinician.firstName)
  const [surName, setSurName] = useState(clinician.surName)
  const [selectEditId, setSelectEditId] = useState('')

  const editClinicianMutation = useMutation(
    ({
      id,
      firstName,
      surName,
    }: {
      id: string
      firstName: string
      surName: string
    }) =>
      fetch(`https://pkudevapi.imobisoft.uk/api/Clinician/EditClinician`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,

          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          firstName,
          surName,
        }),
      }),
    {
      onSuccess: async () => {
        setShowUpdatePopup(false)
        refetch()
        console.log(
          'ClinicianListItem - Clinicians refetched',
          selectEditId,
          firstName,
          surName
        )
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    editClinicianMutation.mutate({
      id: selectEditId,
      firstName,
      surName,
    })
  }

  function ShowUpdate(id) {
    setShowUpdatePopup(true)
    setSelectEditId(id)
  }

  return (
    <div>
      <div className='border-b-gray-400 border-b text-uppercase font-normal flex justify-between text-lg text-gray-700 py-2 w-full'>
        <span className='flex justify-start px-2'>{clinician.fullName}</span>
        <span className='flex justify-start px-2'>{clinician.email}</span>
        <div className='flex gap-4 items-center px-2'>
          <span
            className='hover:bg-gray-300 rounded p-1'
            onClick={() => ShowUpdate(clinician.id)}
          >
            <Edit2Icon />
          </span>
          {/* Add your delete logic here */}

          <span
            className='hover:bg-gray-300 rounded p-1'
            onClick={() => showDeleteView(clinician.id)}
          >
            <img
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/862px-Delete-button.svg.png`}
              alt=''
              height={20}
              width={20}
            />
          </span>
        </div>
      </div>
      {showUpdatePopup && (
        <>
          {/* Overlay */}
          <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
          {/* Update Form */}
          <form className='max-w-md w-[50%] mx-auto bg-white p-8 rounded-md shadow-md z-50 fixed top-[30%] left-[40%]'>
            <h2 className='text-2xl font-bold mb-4'>Update Clinician</h2>

            {/* First Name Input */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='firstName'
              >
                First Name
              </label>
              <input
                className='w-full border rounded-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline'
                id='firstName'
                type='text'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* SurName Input */}
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='surName'
              >
                SurName
              </label>
              <input
                className='w-full border rounded-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline'
                id='surName'
                type='text'
                placeholder='Enter SurName'
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
              />
            </div>

            {/* Update Button */}
            <div className='flex items-center justify-center'>
              <Button
                onClick={handleSubmit}
                title='Update'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                children={''}
              />
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default ClinicianListItem
