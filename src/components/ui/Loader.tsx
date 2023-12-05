import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader2 className='h-16 w-16 animate-spin' color='#3EB049' />
    </div>
  )
}
