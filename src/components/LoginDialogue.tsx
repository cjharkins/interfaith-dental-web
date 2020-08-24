import React, { FC, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../store/auth/actions'

interface LoginDialogueProps {
  style?: object | undefined
}

export const LoginDialogue: FC<LoginDialogueProps> = ({ style }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  return (
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
      <div>
        <Dialog
          style={{
            zIndex: 10000,
            position: 'absolute',
          }}
          open={showLogin}
          onClose={() => setShowLogin(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Admin Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="admin-username"
              label="Admin Username"
              type="text"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              id="admin-password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLogin(false)}>Cancel</Button>
            <Button
              onClick={(): unknown => {
                dispatch(adminLogin({ user, password }))
                return
              }}
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
