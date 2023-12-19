import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loader from '../components/ui/Loader'
import Layout from '../layout/Layout'
import Logins from '../pages/login/Logins'
import { ClinicianPatients } from '../pages/ClinicianDashboard/ClinicianPatients'
import ClinicianAssessments from '../pages/ClinicianDashboard/ClinicianAssessments'
const AdminSideNav = lazy(() => import('../components/AdminSideNav'))
const ClinicianSideNav = lazy(() => import('../components/ClinicianSideNav'))

const ClinicianDashboard = lazy(
  () => import('../pages/ClinicianDashboard/ClinicianDashboard')
)
const Clinician = lazy(() => import('../pages/ClinicianDashboard/Clinician'))
const Dashboard = lazy(() => import('../pages/AdminDashboard/Dashboard'))
const Categories = lazy(
  () => import('../pages/AdminDashboard/Categories/Categories')
)
const AddCategory = lazy(
  () => import('../pages/AdminDashboard/Categories/AddCategory')
)
const UpdateCategory = lazy(
  () => import('../pages/AdminDashboard/Categories/UpdateCategory')
)
const SubCategories = lazy(
  () => import('../pages/AdminDashboard/SubCategories/SubCategories')
)
const AddNewSubCategory = lazy(
  () => import('../pages/AdminDashboard/SubCategories/AddNewSubCategory')
)
const UpdateSubCategory = lazy(
  () => import('../pages/AdminDashboard/SubCategories/UpdateSubCategory')
)
const Search = lazy(() => import('../pages/AdminDashboard/Search/Search'))
const Clinicians = lazy(
  () => import('../pages/AdminDashboard/Clinicians/Clinicians')
)
const AddClinician = lazy(
  () => import('../pages/AdminDashboard/Clinicians/AddClinician')
)
const Patients = lazy(() => import('../pages/AdminDashboard/Patients/Patients'))
const Assessments = lazy(
  () => import('../pages/AdminDashboard/Assesments/Asessments')
)
const ChangePassWord = lazy(
  () => import('../pages/AdminDashboard/ChangePassWord')
)

const routes = [
  {
    path: '/admin-sideNav',
    element: (
      <Suspense fallback={<Loader />}>
        <AdminSideNav />
      </Suspense>
    ),
  },

  {
    path: '/clinician-sideNav',
    element: (
      <Suspense fallback={<Loader />}>
        <ClinicianSideNav />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '/categories',
    element: (
      <Suspense fallback={<Loader />}>
        <Categories />
      </Suspense>
    ),
  },
  {
    path: '/editCategory/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <UpdateCategory />
      </Suspense>
    ),
  },
  {
    path: '/add-newCategory',
    element: (
      <Suspense fallback={<Loader />}>
        <AddCategory />
      </Suspense>
    ),
  },
  {
    path: '/editSubCategory',
    element: (
      <Suspense fallback={<Loader />}>
        <UpdateSubCategory />
      </Suspense>
    ),
  },
  {
    path: '/add-newSubCategory',
    element: (
      <Suspense fallback={<Loader />}>
        <AddNewSubCategory />
      </Suspense>
    ),
  },
  {
    path: '/sub-categories',
    element: (
      <Suspense fallback={<Loader />}>
        <SubCategories />
      </Suspense>
    ),
  },
  {
    path: '/search-by-food',
    element: (
      <Suspense fallback={<Loader />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: '/admin-clinicians',
    element: (
      <Suspense fallback={<Loader />}>
        <Clinicians />
      </Suspense>
    ),
  },
  {
    path: '/add-clinician',
    element: (
      <Suspense fallback={<Loader />}>
        <AddClinician />
      </Suspense>
    ),
  },
  {
    path: '/patients',
    element: (
      <Suspense fallback={<Loader />}>
        <Patients />
      </Suspense>
    ),
  },
  {
    path: '/asessments',
    element: (
      <Suspense fallback={<Loader />}>
        <Assessments />
      </Suspense>
    ),
  },
  {
    path: '/change-password',
    element: (
      <Suspense fallback={<Loader />}>
        <ChangePassWord />
      </Suspense>
    ),
  },
  {
    path: '/clinician-sideNav',
    element: (
      <Suspense fallback={<Loader />}>
        <ClinicianSideNav />
      </Suspense>
    ),
  },
  {
    path: '/clinician-dashboard',
    element: (
      <Suspense fallback={<Loader />}>
        <ClinicianDashboard />
      </Suspense>
    ),
  },
  {
    path: '/clinician',
    element: (
      <Suspense fallback={<Loader />}>
        <Clinician />
      </Suspense>
    ),
  },
  {
    path: '/clinician-patients',
    element: (
      <Suspense fallback={<Loader />}>
        <ClinicianPatients />
      </Suspense>
    ),
  },
  {
    path: '/clinician-Assessments',
    element: (
      <Suspense fallback={<Loader />}>
        <ClinicianAssessments />
      </Suspense>
    ),
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Logins />
      </Suspense>
    ),
  },
])

const Routes = () => <RouterProvider router={router} />

export default Routes
