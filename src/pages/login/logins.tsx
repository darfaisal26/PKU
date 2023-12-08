import React, { Fragment, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Label from '../../components/Label'
import axios from 'axios'
// interface LoginError {
//   username: string
//   password: string
// }
// interface ResponseData {}
interface FormData {
  username: string
  password: string
  isWeb: boolean
}
// <ResponseData, AxiosError<LoginError>, FormData></LoginError>
function Logins() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [otppage, setOtpPage] = useState(true)
  const [code, setCode] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const mutation = useMutation(fetchLogin, {
    onSuccess: () => {
      console.log('Login successful')
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      handleErrors(error)
    },
  })

  async function fetchLogin(formData: FormData) {
    try {
      const response = await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/Login',
        formData
      )

      const role = response.data.result.role

      if (role === 'Admin') {
        localStorage.setItem('userRole', 'Admin')
        navigate('/admin-sideNav')
      } else if (role === 'Clinician') {
        localStorage.setItem('userRole', 'Clinician')
        setOtpPage(!otppage)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      ...credentials,
      isWeb: true,
    }

    try {
      //   // Reset form errors
      setFormErrors({})

      // Validation
      if (!formData.username.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Username is required',
        }))
        return
      }
      if (!formData.password.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password is required',
        }))
        return
      }
      mutation.mutate(formData)
      console.log(formData)
    } catch (error) {
      console.error('Error during form submission:', error)
    } finally {
      // Reset credentials to default values
      setCredentials({ username: '', password: '' })
    }
  }

  function verifyOtp() {
    const fetch = async () => {
      try {
        const response = await axios.post(
          'https://pkudevapi.imobisoft.uk/api/Account/LoginWithOtp',
          {
            username: credentials.username,
            code,
            isWeb: true,
          }
        )

        if (response.status === 200) {
          navigate('/clinician-sideNav')
        }
        console.log(response.data)
        console.log(code, credentials.username)
      } catch (error) {
        console.error('Error during OTP verification:', error)
      }
    }

    fetch()
  }
  function handleErrors(error) {
    if (axios.isAxiosError(error)) {
      const { response } = error
      if (response) {
        const { status, data } = response
        if (status === 401) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            general: 'Invalid credentials',
          }))
        } else {
          console.error('Login failed with unexpected status:', status, data)
        }
      } else {
        console.error('Network error during login:', error.message)
      }
    } else {
      console.error('Unexpected error during login:', error)
    }
  }
  return (
    <div className='h-screen flex justify-center items-center bg-blue-900'>
      <div
        className={`bg-white ${
          otppage ? 'w-[400px]' : 'w-[50%]'
        } px-20 py-12 rounded-2xl`}
      >
        <h1 className='text-[28px] font-bold text-[#2A3547]'>Welcome to PKU</h1>

        <form className='flex flex-col pb-5' onSubmit={handleSubmit}>
          {['username', 'password'].map((field) => (
            <Fragment key={field}>
              <Label
                htmlFor={field}
                className='text-[#2A3547] font-semibold pb-2 text-lg'
              >
                {field === 'username' ? 'Username' : 'Password'}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder=''
                value={credentials[field]}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className={`rounded-[7px] border mb-5 border-[#DFE5EF] bg-white p-2
                 focus:border-orange-600 focus-visible:outline-2 outline-orange-600`}
                required={false}
              />
              {formErrors[field] && (
                <div className='text-red-500 text-sm'>{formErrors[field]}</div>
              )}
            </Fragment>
          ))}
          {/* {mutation.isError && (
            <div className='text-red-500 text-sm'>{mutation.error.message}</div>
          )} */}
          {/* {mutation.isError && (
            <div className='error-message'>
              {mutation.error.response ? (
                // Display specific error message for known status codes
                <>
                  {mutation.error.response.status === 401 && (
                    <span>Invalid username or password</span>
                  )}
                  {/* Add more cases for other status codes as needed 
                </>
              ) : (
                // Display a generic error message for unknown errors
                <span>An error occurred during login</span>
              )}
            </div>
          )} */}

          <button
            type='submit'
            className={`bg-orange-500 text-white px-10 py-2 border rounded text-lg font-normal ${
              mutation.isLoading ? 'cursor-not-allowed' : ''
            }`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {otppage ? (
          <div className='text-left text-green-800 text-sm font-semibold p-2'>
            Forgot Password
          </div>
        ) : (
          <div className='flex flex-col items-center shadow-2xl py-8 px-6 border border-red-900 rounded-lg'>
            <h2 className='text-black font-semibold mb-4'>Enter OTP</h2>
            <form
              className='flex flex-col items-center'
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  className='w-36 h-10 text-center border rounded-md m-1 focus:outline-none focus:border-orange-500'
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <button
                type='submit'
                className='bg-orange-400 rounded px-20 py-2 text-white mt-4 cursor-pointer font-serif text-[18px]'
                disabled={mutation.isLoading}
                onClick={verifyOtp}
              >
                {mutation.isLoading ? 'Verifying' : 'Verify Otp'}
              </button>
            </form>

            <p className='text-green-800 py-8 font-semibold cursor-pointer text-[18px] font-serif'>
              Resend Otp
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Logins
