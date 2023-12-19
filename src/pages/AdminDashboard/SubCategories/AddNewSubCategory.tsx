import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../components/button'

interface Data {
  CategoryName: string
  SubCategoryName: string
}
const AddNewSubCategory = () => {
  const [categoryname, setcategoryname] = useState('')
  const [Subcategoryname, setSubcategoryname] = useState('')

  const mutation = useMutation(async (requestData: Data) =>
    fetch('https://pkudevapi.imobisoft.uk/api/FoodCategory/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      try {
        const data = await response.json()
        return data
      } catch (error) {
        return null // or handle the error as needed
      }
    })
  )
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submiited')

    const requestBody: Data = {
      CategoryName: `${categoryname}`,
      SubCategoryName: `${Subcategoryname}`,
    }
    mutation.mutate(requestBody)
    console.log(requestBody, 'requestbody')
  }
  return (
    <div className='py-20 px-4 '>
      <div>
        <h1 className='text-white font-medium italic text-lg py-10'>
          Add New SubCategory
        </h1>
      </div>

      <div className='border mx-10 bg-white grid gap-6  py-16 px-20  rounded-md'>
        <div className='flex justify-start py-2'>
          <Button
            className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
            title={'back'}
            children={''}
          />
        </div>
        <form
          encType='multipart/form-data'
          onSubmit={handleSubmit}
          className='grid gap-6'
        >
          <div className='border rounded-md py-2 '>
            <input
              type='text'
              placeholder='Sub Category Name*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setSubcategoryname(e.target.value)}
            />
          </div>
          <div className='border rounded-md py-2 '>
            <input
              type='text'
              placeholder='Category Name*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setcategoryname(e.target.value)}
            />
          </div>

          <div className=' flex justify-end px-8 py-2'>
            <button
              className='bg-gray-200 rounded italic border border-primary  
             text-center text-lg font-normal px-12 py-2 '
              type='submit'
            >
              {mutation.isLoading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddNewSubCategory
