import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Informational from './Informational/Informational'
import { updateCount } from '../store/ui/actions'
import {addAnswersToArray} from '../store/form/actions'
import { useDispatch } from 'react-redux'
import { useBreakpoint } from './MediaBreakpointProvider'

export interface ScrollViewProps {
  count?: number | undefined
  answerChoices: string [] | undefined
  questionText: string | undefined
  questionType: string | undefined
}

const Form: FC<ScrollViewProps> = ({ answerChoices, questionText, questionType, count = 0 }) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()

  const [checked, setChecked] = useState<string>('')
  const [answerSelected, setAnswerSelected] = useState<string>('')
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
  useEffect(() => {
    console.log('dispatch checked with selection of ' + checked)
  }, [checked])

  useEffect(() => console.log(answerSelected), [answerSelected])
  useEffect(() => console.log(answersSelected), [answersSelected])


  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: breakpoints.sm ? 170 : 128,
      }}
    >
      <div style={{ height: '100%', width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
          }}
        >
          <div
            style={{
              width: breakpoints.sm ? '100%' : 700,
              background: 'white',
            }}
          >
            <QuestionHeader count={count} />
            <div style={{ padding: '0 30px 30px' }}>
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
            onChange={handleChange}
          />
        )}
        {questionType === 'singleSelect' && (
          <div style={{ width: '100%', fontSize: 14 }}>
            {answerChoices !== undefined &&
              // answerChoices.length > 0 &&
              ['answerChoices', 'answer 1', 'answer 2'].map((val, index) => {
                return (
                  <div
                    key={val}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      borderTop: '1px solid lightgrey',
                      borderBottom:
                        val === 'Case Worker' ? '1px solid lightgrey' : 'none',
                      width: '100%',
                      padding: '15px 0',
                    }}
                  >
                    <input
                      type="radio"
                      onChange={() => setChecked(val)}
                      checked={checked === val}
                    />{' '}
                    {val}
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
                // answerChoices.length > 0 &&
                ['answerChoices', 'answer 1', 'answer 2'].map((val, index) => (
                  <MenuItem key={val} value={val}>
                    {val}
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
              {['option 1', 'option 2', 'option 3'].map((val, index) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              })}
            </Select>
          </div>
        )}
      </div>
    </div>
            </div>
          </div>
        </div>
        <a
          style={{ textDecoration: 'none' }}
          // href={valid ? `#view${count}` : `#view${count - 1}`}
          href={`#view${count}`}
        >
          <div
            onClick={(): unknown => {
              // setValid(false)
              //Validate if question has been answered 
              dispatch(addAnswersToArray({answerChoices, questionText, questionType, selectedAnswer: 'Boop'}))
              dispatch(updateCount(count))
              return
            }}
            style={{
              width: '116px',
              height: 'max-content',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 0,
              margin: '0 auto',
            }}
          >
            <div style={{ margin: '0 auto', color: '#003B49' }}>NEXT</div>
            <div style={{ margin: '-10px auto 0' }}>
              <ExpandMoreIcon
                style={{
                  width: 45,
                  height: 'auto',
                  color: '#003B49',
                }}
              />
            </div>
          </div>
        </a>
      </div>
      <div ref={scrollRef} id={`view${count ? count : 0}`} />
    </div>
  )
}

interface QuestionHeaderProps {
  count: number | undefined
}

const QuestionHeader: FC<QuestionHeaderProps> = ({ count = 1 }) => {
  const breakpoints: any = useBreakpoint()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 30px',
      }}
    >
      <div
        style={{
          width: breakpoints.sm ? '100%' : 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <a href={`#view${count === 1 ? 'Top' : count - 2}`}>
          <ExpandLessIcon
            style={{
              marginTop: 15,
              width: 38,
              height: 'auto',
              color: '#003B49',
            }}
          />
        </a>
        <div style={{ width: '100%' }}>
          <div style={{ borderBottom: '2px solid #EE2737', width: 120 }}>
            <h3 style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>
              {count}.
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
