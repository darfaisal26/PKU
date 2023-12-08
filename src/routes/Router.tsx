import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loader from '../components/ui/Loader'
import Layout from '../layout/Layout'
import Logins from '../pages/login/logins'

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
const SubCategories = lazy(
  () => import('../pages/dashboard/AdminDashboard/SubCategories')
)
const Search = lazy(() => import('../pages/dashboard/AdminDashboard/Search'))
const Clinicians = lazy(
  () => import('../pages/dashboard/AdminDashboard/Clinicians')
)
const Patients = lazy(
  () => import('../pages/dashboard/AdminDashboard/Patients')
)
const Assessments = lazy(
  () => import('../pages/dashboard/AdminDashboard/Asessments')
)

const ChangePassWord = lazy(
  () => import('../pages/dashboard/AdminDashboard/ChangePassWord')
)
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
        path: '/patients',
        element: (
          <Suspense fallback={<Loader />}>
            <Patients />
          </Suspense>
        ),
      },
      {
        path: 'asessments',
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
        path: '/add-newCategory',
        element: (
          <Suspense fallback={<Loader />}>
            <AddCategory />
          </Suspense>
        ),
      },
    ],
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

export const Routes = () => <RouterProvider router={router} />
