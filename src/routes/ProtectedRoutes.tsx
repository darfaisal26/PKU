import React from 'react'
import { Route, Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  path: string
  element: React.ReactNode
  children: React.ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  path,
  element,
  children,
}) => {
  // Add your authentication check logic here
  const isAuthenticated = localStorage.getItem('userToken') !== null

  return isAuthenticated ? (
    <Route path={path} element={element}>
      {children}
    </Route>
  ) : (
    <Navigate to='/' replace={true} />
  )
}

export default ProtectedRoutes
