import React, { FC, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthState } from '../store/auth/types'
import { useDispatch, connect } from 'react-redux'

interface ProtectRouteProps {
  auth?: AuthState | undefined
  component?: object | undefined
  exact?: boolean
  path?: string
}

export const PrivateRoute: FC<ProtectRouteProps> = ({
  auth,
  component,
  path,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('interfaith-token')
    const parsedToken = token !== null ? JSON.parse(token) : {}
    const now = new Date()
    if (localStorage.getItem('interfaith-token') !== null) {
      if (now.getTime() > parsedToken.expires) {
        localStorage.removeItem('interfaith-token')
        dispatch({ type: 'VALIDATION_FAILURE', payload: { loggedIn: false } })
      }
      dispatch({ type: 'VALIDATION_SUCCESS', payload: { loggedIn: true } })
    } else {
      dispatch({ type: 'VALIDATION_FAILURE', payload: { loggedIn: false } })
    }
  }, [])

  return auth && auth.loggedIn ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/" />
  )
}

const mapStateToProps = (state: any) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(PrivateRoute)
