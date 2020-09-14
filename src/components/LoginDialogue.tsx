import React, { FC, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog'
import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { useDispatch, connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { adminLogin } from '../store/auth/actions'
import { AuthState } from '../store/auth/types';

interface LoginDialogueProps {
  style?: object | undefined
  auth?: AuthState | undefined
  className?: string | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      margin: ".5em 0"
    }
  })
);

export const LoginDialogue: FC<LoginDialogueProps> = ({ auth = {}, style = {} }) => {
  const classes = useStyles();
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  let content;

  const handleAdminLogin = () => {
    dispatch(adminLogin({ user, password }));
  }

  // https://github.com/babel/babel/issues/8837
  // Unable to use ternary operators
  if (auth.loggedIn) {
    content = <Redirect to="/admin" /> 
  } else {
    content = <div>
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
            {auth && auth.isError ? <Alert className={classes.alert} severity="error">{auth.error}</Alert> : <></> }
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setShowLogin(false)}>Cancel</Button>
            <Button
              onClick={() => handleAdminLogin()}
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  }
  
    return (
      <div>{content}</div>
    );
}

const mapStateToProps = (state : any) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(LoginDialogue)