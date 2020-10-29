import React, { FC, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { useDispatch, connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { adminLogout } from '../store/auth/actions'
import { AuthState } from '../store/auth/types'

interface LogoutProps {
  style?: object | undefined
  auth?: AuthState | undefined
  className?: string | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      margin: '.5em 0',
    },
  })
)

export const LoginDialogue: FC<LogoutProps> = ({ auth = {}, style = {} }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let content

  const handleAdminLogout = () => {
    dispatch(adminLogout())
  }

  // https://github.com/babel/babel/issues/8837
  // Unable to use ternary operators
  if (!auth.loggedIn) {
    content = <Redirect to="/" />
  } else {
    content = (
      <div>
        <div
          style={{
            ...style,
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#545859',
          }}
          onClick={() => handleAdminLogout()}
        >
          Logout
        </div>
      </div>
    )
  }

  return <div>{content}</div>
}

const mapStateToProps = (state: any) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(LoginDialogue)
