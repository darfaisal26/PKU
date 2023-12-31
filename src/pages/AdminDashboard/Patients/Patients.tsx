import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LucideEye } from 'lucide-react'
import { getAuthToken } from '../../../utils/auth'
import Loader from '../../../components/ui/Loader'

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const queryKey = 'patients'
  const authToken = getAuthToken()
  const itemsPerPage = 10

  const fetchPatients = async (page) => {
    const response = await fetch(
      `https://pkudevapi.imobisoft.uk/api/Patient/GetAll?pageNo=${page}&pageSize=${itemsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return data.result.data
  }

  const {
    data: patients = [],
    isLoading,
    refetch,
  } = useQuery([queryKey, currentPage], () => fetchPatients(currentPage), {
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient)
    setShowPatientDetails(true)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className='mx-10 grid gap-10 py-16'>
      {isLoading && <Loader />}
      <h1 className='text-lg font-medium text-white'>Patients</h1>

      <div className='bg-white rounded-md flex flex-col gap-10 px-4 pt-6'>
        <div className='flex justify-end py-2 gap-10'>
          <div className='relative border flex flex-wrap items-stretch rounded-md bg-white p-2'>
            <input
              type='search'
              className='relative text-lg flex-auto rounded font-normal leading-[1.6] outline-none'
              placeholder='Search'
            />

            <button
              className='relative bg-primary flex items-center rounded font-medium shadow-md'
              type='button'
              id='button-addon1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='white'
                className='h-7 w-7'
              >
                <path
                  fillRule='evenodd'
                  d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='grid gap-2 py-4 rounded-md w-full px-3'>
          <div className='bg-slate-100 rounded-md grid grid-cols-5 text-lg font-mono px-4 py-4'>
            <span className='flex justify-center'>Name</span>
            <span className='flex justify-center'>Email</span>
            <span className='flex justify-center'>NHS</span>
            <span className='flex justify-center'>Hospital Req No</span>
            <span className='flex justify-center'>Action</span>
          </div>

          {patients.map((patient, index) => (
            <PatientRow
              key={index}
              patient={patient}
              handleViewDetails={handleViewDetails}
            />
          ))}

          {patients.length === 0 && (
            <div className='border h-[500px] flex justify-center items-center'>
              <h1 className='text-xl text-gray-400 font-medium'>
                No Records Found
              </h1>
            </div>
          )}

          {showPatientDetails && selectedPatient && (
            <PatientDetailsModal
              selectedPatient={selectedPatient}
              setShowPatientDetails={setShowPatientDetails}
            />
          )}

          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            hasPreviousPage={currentPage !== 1}
            hasNextPage={patients.length > 0}
          />
        </div>
      </div>
    </div>
  )
}

const PatientRow = ({ patient, handleViewDetails }) => (
  <div
    className='border-b-gray-400 border-b text-uppercase font-normal grid grid-cols-5 text-lg text-gray-700 py-2 w-full cursor-pointer'
    onClick={() => handleViewDetails(patient)}
  >
    <span className='flex justify-center px-2'>{patient.fullName}</span>
    <span className='flex justify-center px-2'>{patient.emailAddress}</span>
    <span className='flex justify-center px-2'>{patient.nhSnumber}</span>
    <span className='flex justify-center px-2'>
      {patient.hospitalRegistrationnumber}
    </span>
    <span className='flex px-2 justify-center'>
      <LucideEye />
    </span>
  </div>
)

const PatientDetailsModal = ({ selectedPatient, setShowPatientDetails }) => (
  <>
    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50'></div>
    <div className='rounded-md grid gap-4 px-12 py-6 fixed top-[30%] left-[45%] border bg-white z-50 w-[30%]'>
      <div className='flex justify-end'>
        <button
          onClick={() => setShowPatientDetails(false)}
          className='text-white rounded bg-gray-400 text-lg hover:bg-green-500 px-4 py-2'
        >
          Close
        </button>
      </div>
      <h1 className='text-3xl font-normal'>View patient</h1>
      <div className='grid gap-3 border border-red-900'>
        <PatientDetailRow label='Name' value={selectedPatient.fullName} />
        <PatientDetailRow label='Email' value={selectedPatient.emailAddress} />
        <PatientDetailRow label='Dob' value={selectedPatient.dob} />
        <PatientDetailRow
          label='NHS number'
          value={selectedPatient.nhSnumber}
        />
        <PatientDetailRow
          label='Hospital Registration'
          value={selectedPatient.hospitalRegistrationnumber}
        />
      </div>
    </div>
  </>
)

const PatientDetailRow = ({ label, value }) => (
  <div className='w-full rounded px-2 py-2 flex gap-6 text-lg'>
    <span className='font-medium'>{label}:</span>
    <span>{value}</span>
  </div>
)

const Pagination = ({
  currentPage,
  handlePageChange,
  hasPreviousPage,
  hasNextPage,
}) => (
  <div className='inline-flex justify-center'>
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={!hasPreviousPage}
      className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-pointer'
    >
      Previous
    </button>

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={!hasNextPage}
      className={`${
        !hasNextPage ? 'cursor-not-allowed' : 'cursor-pointer'
      } bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
    >
      Next
    </button>
  </div>
)

export default Patients
