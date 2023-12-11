import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { useParams } from 'react-router-dom'

interface Data {
  CategoryName: string
  SubCategoryName: string
}
const UpdateSubCategory = () => {
  const { id } = useParams()
  const [categoryname, setcategoryname] = useState('')
  const [Subcategoryname, setSubcategoryname] = useState('')
  console.log(id, 'is id')

  const updateCategoryMutation = useMutation((requestData: Data) =>
    fetch(`https://pkudevapi.imobisoft.uk/api/FoodCategory/Update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
  )

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (categoryname.trim() !== '') {
      const requestBody: Data = {
        CategoryName: `${categoryname}`,
        SubCategoryName: `${Subcategoryname}`,
      }

      updateCategoryMutation.mutate(requestBody)
    }
  }
  return (
    <div>
      <div className='py-20 px-4 '>
        <div>
          <h1 className='text-white font-medium italic text-lg py-10'>
            Update Category
          </h1>
        </div>

        <div className='border mx-10 bg-white grid gap-10  py-16 px-20  rounded-md'>
          <div className='flex justify-start py-2'>
            <Button
              className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
              title={'back'}
              children={''}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className='grid gap-4'
          >
            <div className='border rounded-md py-2 '>
              <input
                type='text'
                placeholder='Sub Category Name*'
                className='w-full outline-none py-1  px-2'
                onChange={(e) => setcategoryname(e.target.value)}
              />
            </div>
            <div className='border rounded-md py-2 '>
              <input
                type='text'
                placeholder='Category Name*'
                className='w-full outline-none py-1  px-2'
                onChange={(e) => setSubcategoryname(e.target.value)}
              />
            </div>
            <div className=' flex justify-end px-8 py-2'>
              <button
                className='bg-gray-200 rounded italic border border-primary  
               text-center text-lg font-normal px-12 py-2 '
                type='submit'
              >
                {updateCategoryMutation.isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateSubCategory
