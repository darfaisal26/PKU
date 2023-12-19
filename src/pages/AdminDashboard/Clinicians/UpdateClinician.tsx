import { useState } from 'react'
import Button from '../../../components/button'

const EditClinicianForm = ({ onUpdate }) => {
  const [firstName, setFirstName] = useState('')
  const [surName, setSurName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    onUpdate({ firstName, surName })

    setFirstName('')
    setSurName('')
  }

  return (
    <form className='max-w-md mx-auto bg-white p-8 rounded-md shadow-md'>
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
  )
}

export default EditClinicianForm
