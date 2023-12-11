import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { Link, useParams } from 'react-router-dom'

interface Data {
  name: string
  foodCategoryId: ''
  foodCategoryName: string
}
const UpdateCategory = () => {
  const { id } = useParams()
  console.log(id, 'is id')
  const [categoryName, setCategoryName] = useState('')
  const [image, setImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

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

    if (categoryName.trim() !== '') {
      const requestBody: Data = {
        name: categoryName,
        foodCategoryId: '',
        foodCategoryName: categoryName,
      }

      updateCategoryMutation.mutate(requestBody)
    }
  }
  return (
    <div>
      <div className='py-20 px-4 '>
        <h1 className='text-white font-medium italic text-lg py-10'>
          Update Category
        </h1>

        <div className='border mx-10 bg-white grid gap-10  py-16 px-20  rounded-md'>
          <div className='flex justify-start py-2'>
            <Link to={'/categories'}>
              <Button
                className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
                title={'back'}
                children={''}
              />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className='grid gap-4'
          >
            <div className='border rounded-md py-2 '>
              <input
                type='text'
                placeholder='Category Name*'
                className='w-full outline-none py-1  px-2'
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className='border rounded py-2'>
              <label
                className='flex gap-2  items-center pl-2 text-black   cursor-pointer'
                htmlFor='imageInput'
              >
                <span className='text-lg bg-green-500 px-4 py-1 rounded text-white font-serif'>
                  Change
                </span>
                <input
                  id='imageInput'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                {/* No File Selected */}
              </label>
            </div>
            {image && (
              <div className='flex justify-center items-center p-4'>
                <img src={image} alt='Selected image' />
              </div>
            )}
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

export default UpdateCategory
