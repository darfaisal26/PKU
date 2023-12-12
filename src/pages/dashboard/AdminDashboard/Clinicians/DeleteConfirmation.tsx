import Button from '../../../../components/button'

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
      <div className='bg-white grid gap-6 z-50 rounded-md fixed top-[30%] left-[45%] px-6 py-8'>
        <div className='flex flex-col gap-2 justify-center items-center px-4 py-2'>
          <div className='border-4 border-yellow-500 w-20 h-20 rounded-[50%]'></div>
          <h1 className='text-2xl font-medium'>Confirm</h1>
          <p className='text-gray-500 font-normal text-lg'>
            Are you sure you want to delete this clinician?
          </p>
        </div>
        <div className='flex justify-between'>
          <Button
            onClick={onCancel}
            title={'cancel'}
            children={''}
            className='text-gray-500 hover:bg-slate-500 hover:text-white text-lg border rounded px-4 py-2'
          />
          <Button
            title={'confirm'}
            children={''}
            className='text-white text-lg bg-yellow-500 rounded px-4 py-2'
            onClick={onConfirm}
          />
        </div>
      </div>
    </>
  )
}
export default DeleteConfirmation
