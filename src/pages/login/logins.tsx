import { Fragment, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Label from '../../components/Label'
import axios from 'axios'
import Cookies from 'js-cookie'

interface FormData {
  username: string
  password: string
  isWeb: boolean
}
function Logins() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [otppage, setOtpPage] = useState<boolean>(true)
  const [code, setCode] = useState<string>('')
  const [formErrors, setFormErrors] = useState({})

  const mutation = useMutation(fetchLogin, {
    onSuccess: () => {
      // console.log('Login successful', data)
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      handleErrors(error)
      console.log(error)
    },
  })

  async function fetchLogin(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/Login',
        formData
      )

      const role = response.data.result.role
      const token = response.data.result.token

      if (role === 'Admin') {
        localStorage.setItem('userRole', 'Admin')
        navigate('/admin-sideNav')
      } 
      else if (role === 'Clinician') {
        localStorage.setItem('userRole', 'Clinician')
        setOtpPage(!otppage)
      }
      Cookies.set('userToken', token, { expires: 7 })

      return response.data
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
      console.error('Error during form submission:', error.message)
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
                 focus:border-orange-600 focus-visible:outline outline-orange-600`}
                required={false}
              />
              {formErrors[field] && (
                <div className='text-red-500 text-sm'>{formErrors[field]}</div>
              )}
            </Fragment>
          ))}

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
