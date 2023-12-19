import { Link } from 'react-router-dom'

const ClinicianDashboard = () => {
  const menuItems = [
    {
      id: 1,
      image: 'https://pkudev.imobisoft.uk/assets/images/assesmnt.svg',
      name: 'Patients',
      path: '/clinician-patients',
    },
    {
      id: 2,
      image: 'https://pkudev.imobisoft.uk/assets/images/patient.svg',
      name: 'Assessments',
      path: '/clinician-Assessments',
    },
  ]
  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-white text-lg  py-12 text-center font-medium italic'>
        Clinician Dashboard
      </h1>
      <div className='border flex gap-8 rounded bg-white mx-10 px-10 py-10 h-[70vh]'>
        {menuItems.map((item) => (
          <Link to={item.path}>
            <div className='flex text-lg h-[fit-content] font-normal border justify-center items-center gap-6 rounded px-8 py-6 shadow-md'>
              <img src={item.image} alt='' />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ClinicianDashboard
