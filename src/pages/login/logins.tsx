import { Fragment, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Label from '../../components/Label'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

interface FormData {
  username: string
  password: string
  isWeb: boolean
}

function Logins() {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [OtpPage, setOtpPage] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')
  const [formErrors, setFormErrors] = useState({})
  const mutation = useMutation(fetchLogin, {
    onSuccess: (data) => {
      console.log(data)
      // queryClient.invalidateQueries()
      // setCredentials({ username: '', password: '' })
    },
    onError: (error) => {
      console.error(error, 'error is ..............')
      // setCredentials({ username: '', password: '' })
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
        Cookies.set('userToken', token, { expires: 7 })
        localStorage.setItem('userRole', 'Admin')
        navigate('/admin-sideNav')
      } else if (role === 'Clinician') {
        localStorage.setItem('userRole', 'Clinician')
        await generateOTP(credentials.username)
        setOtpPage(true)
      }
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error during login:', error.message)

      if (axios.isAxiosError(error)) {
        // Axios error (e.g., network error, bad request)
        if (error.response) {
          // The request was made, but the server responded with an error
          const { status, data } = error.response
          toast.error(`API Error: ${status} - ${data.message}`)
        } else {
          // Network error or request was not sent
          toast.error('Network Error. Please try again.')
        }
      } else {
        // Non-Axios error
        toast.error('An error occurred during login. Please try again.')
      }
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      ...credentials,
      isWeb: true,
    }

    try {
      setFormErrors({})
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
    } catch (error) {
      console.error('Error during form submission:', error.message)
      toast.error('An error occurred. Please try again.')
      throw error
    }
  }

  async function generateOTP(usernames: string): Promise<void> {
    try {
      console.log(credentials.username, '..... in generateotp')

      await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/GenerateOTP',
        { username: usernames }
      )
      console.log(usernames, '.....')
    } catch (error) {
      console.error('Error during OTP generation:', error)
    }
  }
  const handleOtpVerification = async (e) => {
    e.preventDefault()
    try {
      console.log(credentials.username, '......... keanh karta ', credentials)

      const response = await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/LoginWithOtp',
        {
          username: credentials.username,
          code,
          isWeb: true,
        }
      )

      if (response.status === 200) {
        const token = response.data.result.token
        Cookies.set('userToken', token, { expires: 7 })
        navigate('/clinician-sideNav')
        toast.success('OTP verification successful!')
      }
      console.log(response.data, 'in otp')
      return response.data
    } catch (error) {
      console.error('Error during OTP verification:', error.message)
      toast.error('OTP verification failed. Please try again.')
    }
  }
  return (
    <div className='h-screen flex justify-center items-center bg-white '>
      <div className=' flex justify-center items-center '>
        <img
          src={'https://pkudev.imobisoft.uk/assets/images/login.svg'}
          alt=''
          className='object-cover h-[fit-content]'
        />
      </div>
      {!OtpPage ? (
        <div className='border flex justify-between px-12 gap-10 py-6 bg-white shadow-2xl rounded'>
          <div
            className={`bg-white ${
              OtpPage ? 'w-[400px]' : 'w-[fit-content]'
            } px-20 py-12 rounded-2xl`}
          >
            <h1 className='text-[28px] font-bold text-[#2A3547]'>
              Welcome to PKU
            </h1>

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
                    <div className='text-red-500 text-sm'>
                      {formErrors[field]}
                    </div>
                  )}
                </Fragment>
              ))}

              <button
                type='submit'
                className={`bg-orange-500 text-white px-10 py-2 border rounded text-lg font-normal
               ${mutation.isLoading ? 'cursor-not-allowed' : ''}`}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className='text-left text-green-800 text-sm font-semibold p-2'>
              Forgot Password
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4 items-center   py-4 px-6 border shadow-sm bg-bg-white  rounded-lg'>
          <h2 className='text-black font-semibold mb-4 '>Enter OTP</h2>
          <form
            className='flex flex-col items-center'
            onSubmit={handleOtpVerification}
          >
            <div className='w-full'>
              <input
                className='w-full  h-10 px-4 border rounded-md  focus:outline-none focus:border-orange-500'
                onChange={(e) => setCode(e.target.value)}
                placeholder=''
              />
            </div>

            <button
              type='submit'
              className='bg-orange-400 rounded px-20 py-2 text-white mt-4 cursor-pointer font-serif text-[18px]'
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Verifying' : 'Verify Otp'}
            </button>
          </form>

          <p className='text-green-800 py-4 font-semibold cursor-pointer text-lgfont-serif'>
            Resend Otp
          </p>
        </div>
      )}
    </div>
  )
}

export default Logins
