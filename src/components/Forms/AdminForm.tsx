import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from '@material-ui/core'
import { AnswerObjectProps, FormState } from '../../store/form/types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import EditIcon from '@material-ui/icons/Edit'
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
}) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()
  const { questions } = useSelector<RootState, FormState>(({ form }) => form)

  const [answerSelected, setAnswerSelected] = useState<any>([])

  const handleChange = (event: any, questionText: string | undefined) => {
    const { value } = event.target
    setAnswerSelected(value)
    return
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span
        style={{ position: 'relative', top: '-128px' }}
        id={`view${questionDisplayOrder}`}
      ></span>
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
            <QuestionHeader count={count} description={questionType} />
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
                  <div style={{ marginTop: '1rem' }}>Question</div>
                  <TextField
                    style={{
                      fontSize: breakpoints.sm ? '1.5em' : 36,
                      marginTop: '1rem',
                    }}
                    defaultValue={questionText}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => {
                      return handleChange(e, questionText)
                    }}
                  ></TextField>
                  {questionType !== 'freeText' ? (
                    <div style={{ marginTop: '1rem' }}>Answers</div>
                  ) : (
                    <></>
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
                              <TextField
                                fullWidth
                                style={{ display: 'block', marginTop: '1rem' }}
                                key={answerText}
                                defaultValue={answerText}
                                required
                                variant="outlined"
                                onChange={(e) => {
                                  return handleChange(e, questionText)
                                }}
                              ></TextField>
                            )
                          }
                        )}
                    </div>
                  )}
                  {questionType === 'dropDown' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      {answerChoices !== undefined &&
                        answerChoices.length > 0 &&
                        answerChoices.map(
                          ({
                            answerText,
                            answerType,
                            answerDisplayOrder,
                            questionDisplayOrder,
                          }) => (
                            <TextField
                              fullWidth
                              style={{ display: 'block', marginTop: '1rem' }}
                              key={answerText}
                              defaultValue={answerText}
                              required
                              variant="outlined"
                              onChange={(e) => {
                                return handleChange(e, questionText)
                              }}
                            ></TextField>
                          )
                        )}
                    </div>
                  )}
                  {questionType === 'multipleSelect' && (
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
                              <TextField
                                fullWidth
                                style={{ display: 'block', marginTop: '1rem' }}
                                key={answerText}
                                defaultValue={answerText}
                                required
                                variant="outlined"
                                onChange={(e) => {
                                  return handleChange(e, questionText)
                                }}
                              ></TextField>
                            )
                          }
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuestionHeaderProps {
  count: number | undefined
  description: string | undefined
}

const QuestionHeader: FC<QuestionHeaderProps> = ({
  count = 1,
  description,
}) => {
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
        <div style={{ width: '100%' }}>
          <div style={{ borderBottom: '2px solid #EE2737', width: '50%' }}>
            <h3 style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>
              {count}. ({description})
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
