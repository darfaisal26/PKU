import axios from 'axios'
import { useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
export const OtpLogin = ({ handleSubmit, mutation, formData }) => {
  const [code, setCode] = useState<string>('')

  const navigate = useNavigate()

  function verifyOtp() {
    const fetch = async () => {
      const response = await axios.post(
        'https://pkudevapi.imobisoft.uk/api/Account/LoginWithOtp',
        {
          username: formData.username,
          code: code,
          isWeb: true,
        }
      )
      if (response.status == 200) {
        navigate('/clinician-sideNav')
      }
      console.log(response.data)
      console.log(code, formData.username)
    }

    fetch()
  }
  return (
    <div>
      <div className='flex w-[50%] flex-col items-center bg-white shadow-2xl py-8 px-6 border border-red-900 rounded-lg'>
        <h2 className='text-black font-semibold mb-4'>Enter OTP</h2>
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <div>
            <input
              className='w-36 h-10 text-center border rounded-md m-1 focus:outline-none focus:border-orange-500'
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-orange-400 rounded px-20 py-2 text-white mt-4
                 cursor-pointer font-serif text-[18px]'
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
    </div>
  )
}
