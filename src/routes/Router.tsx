import Loader from '../components/ui/Loader'
import Layout from '../layout/Layout'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/login/Login'
// import AdminSideNav from '../components/AdminSideNav'
import PatientSideNav from '../components/patientSideNav'
const AdminSideNav = lazy(() => import('../components/AdminSideNav'))
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<Loader />}>
            <PatientSideNav />
          </Suspense>
        ),
      },
    ],
  },
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
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
])

export const Routes = () => <RouterProvider router={router} />
