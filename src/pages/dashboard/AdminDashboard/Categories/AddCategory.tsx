import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../components/button'

interface Data {
  Id: number
  Name: string
  FoodCategoryImage: string
  FoodCategoryImagepath: string
  CreatedDate: string
  TimeStamp: string
}
const AddCategory = () => {
  const [image, setimage] = useState('')
  const [categoryname, setcategoryname] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target.result === 'string') {
          setimage(e.target.result)
        }
        // Add additional handling for other types if needed
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const mutation = useMutation(
    (requestData) =>
      fetch('https://pkudevapi.imobisoft.uk/api/FoodCategory/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify(requestData),
      }).then((response) => console.log(response.json())),
    {
      onMutate: (requestData) => {
        // You can perform optimistic updates here if needed
        // Return the updated state or a promise that resolves to the updated state
        return requestData
      },
    }
  )
  const date = new Date()
  const handleSubmit = () => {
    const requestBody: Data = {
      Id: 19,
      Name: `${categoryname}`,
      FoodCategoryImage: '',
      FoodCategoryImagepath: `${image}`,
      CreatedDate: `${date}`,
      TimeStamp: `${date}`,
    }
    console.log(requestBody)
    mutation.mutate(requestBody)
  }
  return (
    <div className='py-20 px-4 '>
      <h1 className='text-white font-medium italic text-lg py-10'>
        Add New Category
      </h1>

      <div className='border mx-10 bg-white grid gap-10  py-16 px-20  rounded-md'>
        <div className='flex justify-start py-2'>
          <Button
            className='text-green-600 border italic rounded border-primary text-lg font-medium  px-8 py-2 '
            title={'back'}
            children={''}
          />
        </div>
        <form onSubmit={handleSubmit}>
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
              No File Selected
            </label>
            <div className='flex justify-center items-center p-4'>
              {image && <img src={image} alt='Selected image' />}
            </div>
          </div>
          <div className=' flex justify-end px-8 py-2'>
            <Button
              className='bg-gray-200 rounded italic border border-primary  
             text-center text-lg font-normal px-12 py-2 '
              title={mutation.isLoading ? 'Sending...' : 'Submit'}
              children={''}
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddCategory
