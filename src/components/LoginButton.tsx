import React, { FC, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'

interface LoginButtonProps {
  style?: object | undefined
}

export const LoginButton: FC<LoginButtonProps> = ({ style }) => {
  const [showLogin, setShowLogin] = useState(false)

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
            />
            <TextField
              margin="dense"
              id="admin-password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLogin(false)}>Cancel</Button>
            <Button onClick={() => setShowLogin(false)}>Login</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
