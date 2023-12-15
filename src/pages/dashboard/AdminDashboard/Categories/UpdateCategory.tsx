import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Button from '../../../../components/button'
import { Link, useParams } from 'react-router-dom'
import { getAuthToken } from '../../../../utils/auth'
import { Loader } from 'lucide-react'

interface Data {
  updatedid: number
  name: string
  foodCategoryImagepath: string
}

const UpdateCategory = () => {
  const { id } = useParams()
  const [categoryName, setCategoryName] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)
  const authToken = getAuthToken()
  const [selectedid, setSelectedid] = useState(id)

  const { data: categoryDetails, isLoading } = useQuery<Data>(
    ['categoryDetails', id],
    async () => {
      const response = await fetch(
        `https://pkudevapi.imobisoft.uk/api/FoodCategory/GetById?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      setSelectedid(id)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch category details with status: ${response.status}`
        )
      }

      const data = await response.json()

      if (!data.result.data) {
        throw new Error('Category details not found in the response data')
      }

      return data.result.data
    }
  )

  useEffect(() => {
    console.log(categoryDetails, '.........')
    if (categoryDetails) {
      setCategoryName(categoryDetails.name || '')
      setImage(categoryDetails.foodCategoryImagepath)
    }
  }, [categoryDetails])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateCategoryMutation = useMutation(
    (requestData: Data) =>
      fetch(`https://pkudevapi.imobisoft.uk/api/FoodCategory/Update?id=${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Update failed with status: ${response.status}`)
        }
        return response.json()
      }),
    {
      onError: (error: Error) => {
        console.error('Update failed:', error.message)
      },
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (categoryName.trim() !== '') {
      const requestBody: Data = {
        updatedid: Number(selectedid),
        name: categoryName,
        foodCategoryImagepath: image || '',
      }

      updateCategoryMutation.mutate(requestBody)
    }
  }

  return (
    <div className='py-20 px-4'>
      <h1 className='text-white font-medium italic text-lg py-10'>
        Update Category
      </h1>

      <div className='border mx-10 bg-white grid gap-10 py-16 px-20 rounded-md'>
        <div className='flex justify-start py-2'>
          <Link to='/categories'>
            <Button
              className='text-green-600 border italic rounded border-primary text-lg font-medium px-8 py-2'
              title='Back'
              children=''
            />
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className='grid gap-4'>
            <div className='border rounded-md py-2'>
              <input
                type='text'
                placeholder='Category Name*'
                className='w-full outline-none py-1 px-2'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className='border rounded py-2'>
              <label
                className='flex gap-2 items-center pl-2 text-black cursor-pointer'
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
              </label>
            </div>
            {image && (
              <div className='flex justify-center items-center p-4'>
                <img src={image} alt='Selected image' />
              </div>
            )}
            <div className='flex justify-end px-8 py-2'>
              <button
                className='bg-gray-200 rounded italic border border-primary text-center text-lg font-normal px-12 py-2'
                type='submit'
              >
                {updateCategoryMutation.isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UpdateCategory
