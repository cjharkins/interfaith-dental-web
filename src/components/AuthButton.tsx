import React, { FC, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../store/auth/types'

import { adminLogout } from '../store/auth/actions'
import LoginDialogue from './LoginDialogue'

interface AuthButtonProps {
  style?: object | undefined
  auth?: AuthState | undefined
  className?: string | undefined
  showLogin?: boolean | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      margin: '.5em 0',
    },
  })
)

export const AuthButton: FC<AuthButtonProps> = ({ style = {} }) => {
  const { auth }: any = useSelector<AuthState | undefined>(({ auth }: any) => ({
    auth,
  }))

  const classes = useStyles()
  const [showLogin, setShowLogin] = useState(false)
  const dispatch = useDispatch()
  let content

  const handleAdminLogout = () => {
    dispatch(adminLogout())
  }

  if (auth.loggedIn) {
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
          onClick={() => setShowLogin(true)}
        >
          Login
        </div>
      </div>
    )
  }

  return (
    <div>
      {content}
      <LoginDialogue showLogin={showLogin} setShowLogin={setShowLogin} />
    </div>
  )
}

export default AuthButton
