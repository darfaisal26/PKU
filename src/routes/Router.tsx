import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loader from '../components/ui/Loader'
import Layout from '../layout/Layout'
import Logins from '../pages/login/logins'

// Import components with more meaningful names
const AdminSideNav = lazy(() => import('../components/AdminSideNav'))
const PatientSideNav = lazy(() => import('../components/patientSideNav'))
const Dashboard = lazy(
  () => import('../pages/dashboard/AdminDashboard/Dashboard')
)
const Categories = lazy(
  () => import('../pages/dashboard/AdminDashboard/Categories/Categories')
)
const AddCategory = lazy(
  () => import('../pages/dashboard/AdminDashboard/Categories/AddCategory')
)
const UpdateCategory = lazy(
  () => import('../pages/dashboard/AdminDashboard/Categories/UpdateCategory')
)
const SubCategories = lazy(
  () => import('../pages/dashboard/AdminDashboard/SubCategories/SubCategories')
)
const AddNewSubCategory = lazy(
  () =>
    import('../pages/dashboard/AdminDashboard/SubCategories/AddNewSubCategory')
)
const UpdateSubCategory = lazy(
  () =>
    import('../pages/dashboard/AdminDashboard/SubCategories/UpdateSubCategory')
)
const Search = lazy(
  () => import('../pages/dashboard/AdminDashboard/Search/Search')
)
const Clinicians = lazy(
  () => import('../pages/dashboard/AdminDashboard/Clinicians/Clinicians')
)
const AddClinician = lazy(
  () => import('../pages/dashboard/AdminDashboard/Clinicians/AddClinician')
)
const Patients = lazy(
  () => import('../pages/dashboard/AdminDashboard/Patients/Patients')
)
const Assessments = lazy(
  () => import('../pages/dashboard/AdminDashboard/Assesments/Asessments')
)
const ChangePassWord = lazy(
  () => import('../pages/dashboard/AdminDashboard/ChangePassWord')
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
        <PatientSideNav />
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
    path: '/editCategory',
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
    path: '/clinicians',
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
