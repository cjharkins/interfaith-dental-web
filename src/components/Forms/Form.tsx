import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { AnswerObjectProps, FormState } from '../../store/form/types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import {
  updateCount,
  updateMessage,
  setIsCountyCovered,
} from '../../store/ui/actions'
import { addAnswersToArray, handlePostForm } from '../../store/form/actions'
import { UIState } from '../../store/ui/types'
import { useDispatch, useSelector } from 'react-redux'
import { useBreakpoint } from '../MediaBreakpointProvider'
import { RootState } from '../../store'

export interface ScrollViewProps {
  count?: number | undefined
  answerChoices: AnswerObjectProps[] | undefined
  questionDisplayOrder: number | undefined
  questionText: string | undefined
  questionType: string | undefined
  lastOf: boolean
}

const Form: FC<ScrollViewProps> = ({
  answerChoices,
  questionText,
  questionType,
  questionDisplayOrder,
  count = 0,
  lastOf,
}) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()
  const { questions, answers } = useSelector<RootState, FormState>(
    ({ form }) => form
  )
  const [checked, setChecked] = useState<string>('')
  const [answerSelected, setAnswerSelected] = useState<any>(
    questionType === 'freeText' ? '' : []
  )

  const { isCoveredCounty } = useSelector<RootState, UIState>(
    (state) => state.ui
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
  const setInformationalScreen = () => {
    if (
      questionDisplayOrder &&
      questionDisplayOrder === 6 &&
      answerChoices
        ?.filter((a) => a.answerText === answerSelected)[0]
        .answerDisplayOrder.toString() === '10'
    ) {
      handlePostForm({ questions, answers })
      dispatch(updateMessage('smileOn60', false))
    }

    const acceptedAnswers = ['3', '9', '12', '20', '23', '75', '76', '84', '95']
    const answerChoiceOrder =
      answerChoices
        ?.filter((a) => a.answerText === answerSelected)[0]
        .answerDisplayOrder.toString() || ''
    const countyQuestion = [10, 11, 12]
    if (
      questionDisplayOrder &&
      countyQuestion.includes(questionDisplayOrder) &&
      acceptedAnswers.includes(answerChoiceOrder) &&
      isCoveredCounty == false
    ) {
      dispatch(setIsCountyCovered(true))
    }
    if (
      questionDisplayOrder &&
      questionDisplayOrder === 13 &&
      !isCoveredCounty &&
      answerChoiceOrder === '1'
    ) {
      dispatch(updateMessage('oralHealth', false))
    }
  }

  const validatePhone = (value: string): boolean => {
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g.test(value)
  }

  const validateInput = (
    value: string,
    questionDisplayOrder: number | undefined
  ): boolean => {
    switch (questionDisplayOrder) {
      case 4 || 9:
        const isPhone: boolean = validatePhone(value)
        return isPhone
      default:
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
          return 'Something is wrong.'
        }
        return ''
    }
  }

  const handleChange = (event: any, questionText: string | undefined) => {
    const { value } = event.target
    setAnswerSelected(value)
    return
  }

  useEffect(() => {}, [error])

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
                      className={((questionText || 'unknown') + count)
                        .replace(/\s/g, '')
                        .replace(':', '')
                        .toLowerCase()}
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
                        answerChoices.map(({ answerText }) => {
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
                                id={
                                  answerText.replace(/\s/g, '').toLowerCase() +
                                  Math.random()
                                }
                                onChange={() => {
                                  setAnswerSelected(answerText)
                                }}
                                checked={answerSelected === answerText}
                              />{' '}
                              {answerText}
                            </div>
                          )
                        })}
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
                          answerChoices.map(({ answerText }) => (
                            <MenuItem key={answerText} value={answerText}>
                              {answerText}
                            </MenuItem>
                          ))}
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
                        onChange={(e) => {
                          return handleChangeMultiple(e)
                        }}
                        input={<Input />}
                        style={{ width: 400 }}
                      >
                        {answerChoices !== undefined &&
                          answerChoices.length > 0 &&
                          answerChoices.map(({ answerText }) => {
                            return (
                              <MenuItem key={answerText} value={answerText}>
                                {answerText}
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
            id={`form${count}`}
            onClick={(): unknown => {
              const validated = validateInput(
                answerSelected,
                questionDisplayOrder
              )

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
                if (
                  questionType !== 'freeText' &&
                  questionType !== 'multipleSelect'
                ) {
                  setInformationalScreen()
                }

                if (questionType === 'singleSelect') {
                  const selectedAnswerOrderNumber =
                    (answerChoices &&
                      answerChoices?.length > 0 &&
                      answerChoices?.filter(
                        (a) => a.answerText === answerSelected
                      )[0].answerDisplayOrder) ||
                    ''

                  if (
                    questionDisplayOrder === 1 &&
                    selectedAnswerOrderNumber == '1'
                  ) {
                    dispatch(updateCount(4))
                  } else if (
                    questionDisplayOrder === 14 &&
                    selectedAnswerOrderNumber == '2'
                  ) {
                    dispatch(updateCount(15))
                    // updatedQuestionList = state.questions.filter(
                    //   (q) => q.questionDisplayOrder !== 15
                    // )
                  } else if (
                    questionDisplayOrder === 16 &&
                    selectedAnswerOrderNumber == '2'
                  ) {
                    dispatch(updateCount(20))
                  } else if (
                    questionDisplayOrder === 23 &&
                    selectedAnswerOrderNumber == '2'
                  ) {
                    dispatch(updateCount(25))
                    // updatedQuestionList = state.questions.filter(
                    //   (q) =>
                    //     q.questionDisplayOrder !== 24 && q.questionDisplayOrder !== 25
                    // )
                  } else if (
                    questionDisplayOrder === 21 &&
                    selectedAnswerOrderNumber == '2'
                  ) {
                    dispatch(updateCount(22))
                    // updatedQuestionList = state.questions.filter(
                    //   (q) => q.questionDisplayOrder !== 22
                    // )
                  } else {
                    dispatch(updateCount(count))
                  }
                } else {
                  dispatch(updateCount(count))
                }
              } else {
                setError({
                  isError: true,
                  errorMessage: getErrorMessage(questionText),
                })
              }

              if (lastOf) {
                if (questionDisplayOrder === 33) {
                  const incomeAnswer = answers.filter(
                    (answer) => answer.questionOrderNumber === 32
                  )[0]
                  const incomeQuestion =
                    questions.filter((question) => {
                      if (question.questionDisplayOrder === 32) return question
                    })[0].answerChoices || []
                  const incomeAnswerDisplayOrder = incomeQuestion.filter(
                    (a) => {
                      return a.answerText === incomeAnswer.answerSelected
                    }
                  )[0].answerDisplayOrder

                  const incomeQualificationCheck = (
                    income: any,
                    familySize: any
                  ) => {
                    const matrix: { [key: string]: number[] } = {}
                    for (var n = 0; n < 8; n++) {
                      matrix[String(n + 1)] = [...Array(4 + n * 2).keys()].map(
                        (k) => k + 1
                      )
                    }
                    const formattedFamilySize = familySize.includes('+')
                      ? familySize.replace('+', '')
                      : familySize

                    return matrix[formattedFamilySize].some((i) => income === i)
                  }

                  const isQualified = incomeQualificationCheck(
                    incomeAnswerDisplayOrder,
                    answerSelected
                  )
                  dispatch(updateMessage('thankYou', isQualified))
                }
                handlePostForm({ questions, answers })
                return
              } else {
                return
              }
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
