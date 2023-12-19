import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../../../components/button'
import { getAuthToken } from '../../../utils/auth'
import { Link, useNavigate } from 'react-router-dom'

interface Data {
  name: string
  foodCategoryImage: string
  foodCategoryImagepath: string
}
const AddCategory = () => {
  const [categoryname, setcategoryname] = useState('')
  const [image, setimage] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const authToken = getAuthToken()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target.result === 'string') {
          setimage(e.target.result)
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const createCategory = async (requestData: Data) => {
    const response = await fetch(
      'https://pkudevapi.imobisoft.uk/api/FoodCategory/Create',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  }

  const mutation = useMutation(createCategory, {
    onSuccess: () => {
      console.log('Category created successfully!')
      navigate('/categories')
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      console.error('Error creating category:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submitted')

    const requestBody: Data = {
      name: categoryname,
      foodCategoryImage: image,
      foodCategoryImagepath: '',
    }

    console.log(requestBody, 'requestbody')
    mutation.mutate(requestBody)
  }
  return (
    <div className='py-20 px-4 '>
      <h1 className='text-white font-medium italic text-lg py-10'>
        Add New Category
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
          encType=' multipart/form-data'
          onSubmit={handleSubmit}
          className='grid gap-6'
        >
          <div className='border rounded-md py-2 '>
            <input
              type='text'
              placeholder='Category Name*'
              className='w-full outline-none py-1  px-2'
              onChange={(e) => setcategoryname(e.target.value)}
            />
          </div>
          <div className='border rounded py-2'>
            <label
              className='flex gap-2  items-center pl-2 text-black   cursor-pointer'
              htmlFor='imageInput'
            >
              <span className='text-lg bg-green-500 px-4 py-1 rounded text-white font-serif'>
                Choose
              </span>
              <input
                id='imageInput'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />
              {image ? 'file selected' : 'No File Selected '}
            </label>
          </div>
          {image && (
            <div className='flex border justify-center items-center p-4'>
              <img src={image} alt='Selected image' />
            </div>
          )}
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
export default AddCategory
