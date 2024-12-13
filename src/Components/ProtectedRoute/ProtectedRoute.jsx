import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const ProtectedRoute = () => {
  const { is_authenticated_state } = useContext(AuthContext)

  console.log('Estado de autenticación en ProtectedRoute:', is_authenticated_state)

  return is_authenticated_state ? <Outlet  /> : <Navigate to="/" />
}

export default ProtectedRoute





