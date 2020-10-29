import React, { FC, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { adminLogin } from '../store/auth/actions'
import { AuthState } from '../store/auth/types'
import { RootState } from '../store/index'

interface LoginDialogueProps {
  auth?: AuthState | undefined
  className?: string | undefined
  showLogin?: boolean | undefined
  setShowLogin?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      margin: '.5em 0',
    },
  })
)

export const LoginDialogue: FC<LoginDialogueProps> = (props) => {
  const { isError, error, loggedIn } = useSelector<RootState, AuthState>(
    (state) => state.auth
  )
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleAdminLogin = () => {
    dispatch(adminLogin({ username, password }))
  }

  // https://github.com/babel/babel/issues/8837
  // Unable to use ternary operators
  return loggedIn ? (
    <Redirect to="/admin" />
  ) : (
    <div>
      <Dialog
        style={{
          zIndex: 10000,
          position: 'absolute',
        }}
        open={props.showLogin || false}
        onClose={() => props.setShowLogin(false)}
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
          {isError && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setShowLogin(false)}>Cancel</Button>
          <Button onClick={() => handleAdminLogin()}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LoginDialogue
