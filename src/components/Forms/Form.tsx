import React, { FC, useState } from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { useBreakpoint } from '../MediaBreakpointProvider'
import { Button, ButtonGroup, Checkbox, TextField } from '@material-ui/core'

const Form: FC = () => {
  const [count, setCount] = useState<number>(1)
  const breakpoints: any = useBreakpoint()
  return (
    <div
      style={{
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 30,
      }}
    >
      <div
        style={{
          width: breakpoints.sm ? '100%' : 700,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>
          {"Please enter the patient's information."}
        </p>
        <div style={{ width: '100%', fontSize: 14 }}>
          <p style={{ fontSize: 16 }}>Personal Information</p>
          <form noValidate autoComplete="off">
            <TextField
              style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{ width: '80%', maxWidth: 400 }}
              id="outlined-basic"
              label="Age"
              variant="outlined"
            />
            <div style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}>
              <Checkbox
                onChange={() => alert('dispatching smile over 60 view')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Check if aged 60 or above
            </div>
            <p style={{ fontSize: 16 }}>
              Number of people including patient wanting care in household
            </p>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  if (count === 1) return
                  const subtractFromCount = count - 1
                  setCount(subtractFromCount)
                }}
              >
                -
              </Button>
              <Button>{count}</Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  const addToCount = count + 1
                  setCount(addToCount)
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </div>
      {/*{ DELETE BELOW }*/}
      <div
        style={{
          width: breakpoints.sm ? '100%' : 700,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>
          {"Please enter the patient's information."}
        </p>
        <div style={{ width: '100%', fontSize: 14 }}>
          <p style={{ fontSize: 16 }}>Personal Information</p>
          <form noValidate autoComplete="off">
            <TextField
              style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{ width: '80%', maxWidth: 400 }}
              id="outlined-basic"
              label="Age"
              variant="outlined"
            />
            <div style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}>
              <Checkbox
                onChange={() => alert('dispatching smile over 60 view')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Check if aged 60 or above
            </div>
            <p style={{ fontSize: 16 }}>
              Number of people including patient wanting care in household
            </p>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  if (count === 1) return
                  const subtractFromCount = count - 1
                  setCount(subtractFromCount)
                }}
              >
                -
              </Button>
              <Button>{count}</Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  const addToCount = count + 1
                  setCount(addToCount)
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
