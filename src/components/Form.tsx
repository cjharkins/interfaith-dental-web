import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { AnswerObjectProps } from '../store/form/types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { updateCount, updateMessage } from '../store/ui/actions'
import { addAnswersToArray } from '../store/form/actions'
import { useDispatch } from 'react-redux'
import { useBreakpoint } from './MediaBreakpointProvider'

export interface ScrollViewProps {
  count?: number | undefined
  answerChoices: AnswerObjectProps[] | undefined
  questionText: string | undefined
  questionType: string | undefined
  lastOf: boolean
}

const Form: FC<ScrollViewProps> = ({
  answerChoices,
  questionText,
  questionType,
  count = 0,
  lastOf = false,
}) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()

  const [checked, setChecked] = useState<string>('')
  const [answerSelected, setAnswerSelected] = useState<any>(
    questionType === 'freeText' ? '' : []
  )
  const [error, setError] = useState<{
    isError: boolean
    errorMessage: string
  }>({ isError: false, errorMessage: '' })
  const handleChangeMultiple = (event: any) => {
    const { value } = event.target
    if (
      Array.isArray(answerSelected) &&
      answerSelected.some((answer) => answer === value)
    ) {
      return
    } else {
      return setAnswerSelected(value)
    }
  }

  const validatePhone = (value: string): boolean => {
    console.log(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g.test(value)
    )
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g.test(value)
  }

  const validateInput = (
    value: string,
    questionText: string | undefined
  ): boolean => {
    switch (questionText) {
      case 'Phone:':
        const isPhone: boolean = validatePhone(value)
        return isPhone
      default:
        console.log(value.length > 0, 'valuuuuuuu')
        if (value.length > 0 && value !== '') {
          return true
        } else {
          return false
        }
    }
  }

  const getErrorMessage = (questionText: string | undefined): string => {
    switch (questionText) {
      case 'Phone:':
        return 'Something is wrong with your phone number'
      default:
        if (questionText !== '') {
          return 'Somthing is wrong.'
        }
        return ''
    }
  }

  const handleChange = (event: any, questionText: string | undefined) => {
    const { value } = event.target
    return setAnswerSelected(value)
  }
  useEffect(() => {
    console.log('dispatch checked with selection of ' + checked)
  }, [checked])

  useEffect(() => {
    console.log(error)
  }, [error])

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
                      error={error.isError}
                      helperText={error.errorMessage}
                      className={((questionText || 'unknown') + count).replace(/\s/g, '').replace(':', '').toLowerCase()}
                      style={{ width: '80%', maxWidth: 400, margin: '20px 0' }}
                      id="outlined-basic"
                      variant="outlined"
                      label={'Please enter your answer here.'}
                      type={'text'}
                      onChange={(e) => {
                        return handleChange(e, questionText)
                      }}
                    />
                  )}
                  {questionType === 'singleSelect' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      {answerChoices !== undefined &&
                        answerChoices.length > 0 &&
                        answerChoices.map(
                          ({
                            answerText,
                            answerType,
                            answerDisplayOrder,
                            questionDisplayOrder,
                          }) => {
                            return (
                              <div
                                key={answerText}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignContent: 'center',
                                  borderTop: '1px solid lightgrey',
                                  borderBottom:
                                    answerText === 'Case Worker'
                                      ? '1px solid lightgrey'
                                      : 'none',
                                  width: '100%',
                                  padding: '15px 0',
                                }}
                              >
                                <input
                                  type="radio"
                                  id={answerText.replace(/\s/g, '').toLowerCase()}
                                  onChange={() => {
                                    setAnswerSelected(answerText)
                                  }}
                                  checked={answerSelected === answerText}
                                />{' '}
                                {answerText}
                              </div>
                            )
                          }
                        )}
                    </div>
                  )}
                  {questionType === 'dropDown' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      <InputLabel id="demo-simple-select-label">
                        Please Select One
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={answerSelected}
                        onChange={(e) => {
                          return handleChange(e, questionText)
                        }}
                        style={{ width: 400 }}
                      >
                        {answerChoices !== undefined &&
                          answerChoices.length > 0 &&
                          answerChoices.map(
                            ({
                              answerText,
                              answerType,
                              answerDisplayOrder,
                              questionDisplayOrder,
                            }) => (
                              <MenuItem key={answerText} value={answerText}>
                                {answerText}
                              </MenuItem>
                            )
                          )}
                      </Select>
                    </div>
                  )}
                  {questionType === 'multipleSelect' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      <Select
                        labelId={questionText}
                        id={questionText}
                        multiple
                        value={answerSelected}
                        onChange={handleChangeMultiple}
                        input={<Input />}
                        style={{ width: 400 }}
                      >
                        {answerChoices !== undefined &&
                          answerChoices.length > 0 &&
                          answerChoices.map(
                            ({
                              answerText,
                              answerType,
                              answerDisplayOrder,
                              questionDisplayOrder,
                            }) => {
                              return (
                                <MenuItem key={answerText} value={answerText}>
                                  {answerText}
                                </MenuItem>
                              )
                            }
                          )}
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
          id={`form${count}`}
            onClick={(): unknown => {
              const coveredCounties = [
                'Cheatham',
                'Davidson',
                'Dickson',
                'Robertson',
                'Rutherford',
                'Sumner',
                'Williamson',
                'Wilson',
                'Cannon',
                'Bedford',
              ]
              //Validate if question has been answered
              //prevent scroll if invalid!
              console.log(questionText, answerSelected)
              console.log(
                questionText &&
                  questionText.toLowerCase() === 'county where you live:',
                'huh'
              )
              const validated = validateInput(answerSelected, questionText)
              if (
                questionText &&
                questionText.toLowerCase() === 'age:' &&
                answerSelected === '60+'
              ) {
                //postAnswers
                dispatch(updateMessage('smileOn60'))
              }
              //County questions should be checked elsewhere.  after all 3 questions answered if no
              //counties Interfaith serves, updateMessage('oralHealth')
              if (
                questionText &&
                questionText.toLowerCase().includes('county') &&
                !coveredCounties.includes(answerSelected)
              ) {
                //postAnswers
                console.log('boop')
                dispatch(updateMessage('oralHealth'))
              }

              if (validated) {
                setError({
                  isError: false,
                  errorMessage: getErrorMessage(''),
                })
                dispatch(
                  addAnswersToArray({
                    questionOrderNumber: count,
                    answerSelected,
                  })
                )
                dispatch(updateCount(count))
              } else {
                setError({
                  isError: true,
                  errorMessage: getErrorMessage(questionText),
                })
              }

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
            <div style={{ margin: '0 auto', color: '#003B49' }}>
              {lastOf ? 'SUBMIT' : 'NEXT'}
            </div>
            {lastOf ? (
              <div />
            ) : (
              <div style={{ margin: '-10px auto 0' }}>
                <ExpandMoreIcon
                  style={{
                    width: 45,
                    height: 'auto',
                    color: '#003B49',
                  }}
                />
              </div>
            )}
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
