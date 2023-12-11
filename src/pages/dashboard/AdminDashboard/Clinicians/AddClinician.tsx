import { useMutation } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { useState } from 'react'
import { getAuthToken } from '../../../../utils/auth'
import { Link, useNavigate } from 'react-router-dom'

const AddClinician = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const authToken = getAuthToken()
  const navigate = useNavigate()

  const addClinicianMutation = useMutation(
    (newClinician) =>
      fetch('https://pkudevapi.imobisoft.uk/api/Clinician/AddClinician', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClinician),
      }).then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Network response was not ok: ${errorText}`)
        }
      }),
    {
      onSuccess: () => {
        console.log('Clinician added successfully')

        setFirstName('')
        setLastName('')
        setEmail('')
        navigate('/clinicians')
      },
    }
  )

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const newClinician = {
      firstName: FirstName,
      surName: LastName,
      email: Email,
    }
    console.log(newClinician)
    addClinicianMutation.mutate(newClinician)
  } // Call the mutation

  return (
    <div className=' py-16 grid gap-10 mx-4'>
      <div className=' text-white font-medium text-lg py-4 px-4'>
        Add New Clinician
      </div>
      <form action='' onSubmit={handleSubmit}>
        <div className='border-2 bg-white grid rounded-md mx-10 gap-4 py-16 px-32'>
          <div className=' rounded-md  py-3'>
            <Link to={'/clinicians'}>
              <Button
                className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
                title={'back'}
                children={''}
              />
            </Link>
          </div>
          <div className='border rounded-md   px-4 py-3'>
            <input
              type='text'
              placeholder='FirstName*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='border rounded-md px-4 py-3'>
            <input
              type='text'
              placeholder='LastName*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='border rounded-md px-4 py-3'>
            <input
              type='email'
              placeholder='Email*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=' rounded-md px-4 py-3 flex justify-end'>
            <Button
              className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
              title={addClinicianMutation.isLoading ? 'Submitting' : 'Save'}
              children={''}
              type='submit'
              disabled={addClinicianMutation.isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddClinician
