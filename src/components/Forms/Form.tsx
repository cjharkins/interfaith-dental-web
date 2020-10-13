import React, { FC, useEffect, useState } from 'react'
import { useBreakpoint } from '../MediaBreakpointProvider'
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

interface answerObj {
  answerText: string
  answerType: string
  answerDisplayOrder: number
  questionDisplayOrder: number
}

interface FormProps {
  answerChoices: Array<answerObj> | undefined
  questionText: string | undefined
  questionType: string | undefined
}

const Form: FC<FormProps> = ({ answerChoices, questionText, questionType }) => {
  const [checked, setChecked] = useState<string>('')
  const [answerSelected, setAnswerSelected] = useState<string>('')
  const breakpoints: any = useBreakpoint()
  const [answersSelected, setAnswersSelected] = useState<string[]>([])

  const handleChangeMultiple = (event: any) => {
    const { value } = event.target
    if (answersSelected.some((answer) => answer === value)) {
      return
    } else {
      return setAnswersSelected(value)
    }
  }
  const handleChange = (event: any) => {
    const { value } = event.target
    return setAnswerSelected(value)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          {questionText}
        </p>
        {questionType === 'freeText' && (
          <TextField
            style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}
            id="outlined-basic"
            label={questionText}
            variant="outlined"
          />
        )}
        {questionType === 'singleSelect' && (
          <div style={{ width: '100%', fontSize: 14 }}>
            {answerChoices !== undefined &&
              answerChoices.map((val, index) => {
                return (
                  <div
                    key={val.answerText}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      borderTop: '1px solid lightgrey',
                      borderBottom:
                        val.answerText === 'Case Worker'
                          ? '1px solid lightgrey'
                          : 'none',
                      width: '100%',
                      padding: '15px 0',
                    }}
                  >
                    <input
                      type="radio"
                      onChange={() => setChecked(val.answerText)}
                      checked={checked === val.answerText}
                    />{' '}
                    {val.answerText}
                  </div>
                )
              })}
          </div>
        )}
        {questionType === 'dropDown' && (
          <div style={{ width: '100%', fontSize: 14 }}>
            <InputLabel id="demo-simple-select-label">
              {questionText}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={90}
              onChange={handleChange}
              style={{ width: 400 }}
            >
              {answerChoices !== undefined &&
                answerChoices.map((val, index) => (
                  <MenuItem key={val.answerText} value={val.answerText}>
                    {val.answerText}
                  </MenuItem>
                ))}
            </Select>
          </div>
        )}
        {questionType === 'multipleSelect' && (
          <div style={{ width: '100%', fontSize: 14 }}>
            <InputLabel id={questionText}>{questionText}</InputLabel>
            <Select
              labelId={questionText}
              id={questionText}
              multiple
              value={answersSelected}
              onChange={handleChangeMultiple}
              input={<Input />}
              style={{ width: 400 }}
            >
              {answerChoices !== undefined &&
                answerChoices.map((val, index) => {
                  return (
                    <MenuItem key={val.answerText} value={val.answerText}>
                      {val.answerText}
                    </MenuItem>
                  )
                })}
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}

export default Form
