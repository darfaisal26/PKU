import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Label from '../../components/Label'
import axios from 'axios'

function Login() {
  const queryClient = useQueryClient()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [otppage, setOtpPage] = useState(true)
  const [code, setCode] = useState('')

  const navigate = useNavigate()

  const fetchLogin = async (formData) => {
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

  const mutation = useMutation(fetchLogin, {
    onSuccess: () => {
      console.log('Login successful')
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const formData = {
      username,
      password,
      isWeb: true,
    }

    mutation.mutate(formData)
  }

  function verifyOtp() {
    const fetch = async () => {
      const response = await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/LoginWithOtp',
        {
          username: username,
          code: code,
          isWeb: true,
        }
      )
      // if (response.status !== 200) {
      //   throw new Error(`HTTP error! Status: ${response.status}`)
      // }

      console.log(response.data)

      console.log(code, username)

      // Navigate only if the response status is 200
      navigate('/clinician-sideNav')
    }

    fetch()
  }
  return (
    <>
      <div className='h-screen  flex justify-center items-center bg-orange-800'>
       
        {otppage ? (
          <div className=' bg-white w-[400px]  px-20 py-12 rounded-2xl'>
            <div>
              <h1 className='text-[28px] font-bold text-[#2A3547] '>
                Welcome to PKU
              </h1>

              <form className='flex flex-col pb-5' onSubmit={handleSubmit}>
                <Label
                  htmlFor='username'
                  className='text-[#2A3547] font-semibold pb-2 text-lg'
                >
                  Username
                </Label>
                <Input
                  id='text'
                  name='username'
                  type='text'
                  placeholder=''
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='rounded-[7px] border mb-5 border-[#DFE5EF] bg-white p-2 focus:border-orange-600 focus-visible:outline-2 outline-orange-600'
                />
                <Label
                  htmlFor='password'
                  className='text-[#2A3547] font-semibold pb-2 text-lg'
                >
                  Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  placeholder=''
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='rounded-[7px] border mb-5 border-[#DFE5EF] bg-white p-2 focus:border-orange-600 focus-visible:outline-2 outline-orange-600'
                />
                <button
                  type='submit'
                  className={`bg-orange-600 px-10 py-2 border rounded text-lg font-serif ${
                    mutation.isLoading ? ' cursor-not-allowed' : 'Login'
                  }`}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className='flex w-[50%] flex-col items-center bg-white shadow-2xl py-8 px-6 border border-red-900 rounded-lg'>
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
    </>
  )
}
export default Login
