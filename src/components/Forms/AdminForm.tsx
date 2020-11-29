import React, { FC, useEffect, useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import { FormState } from '../../store/form/types'
import { useDispatch, useSelector } from 'react-redux'
import { useBreakpoint } from '../MediaBreakpointProvider'
import { RootState } from '../../store'
import { Question } from '../../store/form/types'
import Button from '@material-ui/core/Button'

export interface ScrollViewProps {
  count?: number | undefined
  question: Question
  index: number
}

const AdminForm: FC<ScrollViewProps> = ({ count, question }) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()
  const { questions } = useSelector<RootState, FormState>(({ form }) => form)
  const {
    questionText,
    answerChoices,
    questionType,
    questionDisplayOrder,
  } = question
  const [updatedQuestion, setQuestionState] = useState(question)

  const handleQuestionChange = (event: any) => {
    const { value, name } = event.target

    setQuestionState({
      ...updatedQuestion,
      [name]: value,
    })
  }

  const handleAnswerChange = (event: any) => {
    const index = parseInt(event.target.getAttribute('data-index'))
    const { value, name } = event.target
    const answers = [...updatedQuestion.answerChoices]
    const prevAnswer = answers[index]

    const updatedAnswer = {
      ...prevAnswer,
      [name]: value,
    }

    const updatedAnswers = answers.map((answer, j) => {
      if (j === index) {
        return updatedAnswer
      } else {
        return answer
      }
    })

    setQuestionState({
      ...updatedQuestion,
      answerChoices: updatedAnswers,
    })
  }

  const handleQuestionUpdate = (data: object) => {
    console.log(data)
  }

  return (
    <div
      style={{
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
              position: 'relative',
            }}
          >
            <Button
              style={{
                backgroundColor: '#F05033',
                color: 'white',
                fontFamily: 'inherit',
                padding: '.75rem 1.5rem',
                textTransform: 'none',
                position: 'absolute',
                top: '2.5rem',
                right: 0,
              }}
              onClick={() => {
                handleQuestionUpdate(updatedQuestion)
              }}
            >
              Save
            </Button>
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
                    fullWidth
                    style={{
                      fontSize: breakpoints.sm ? '1.5em' : 36,
                      marginTop: '1rem',
                    }}
                    key={questionText}
                    name={'questionText'}
                    defaultValue={questionText}
                    variant="outlined"
                    required
                    onChange={(e) => {
                      return handleQuestionChange(e)
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
                        answerChoices.map(({ answerText }, index) => {
                          return (
                            <TextField
                              fullWidth
                              style={{ display: 'block', marginTop: '1rem' }}
                              key={answerText}
                              inputProps={{ 'data-index': index }}
                              name={'answerText'}
                              defaultValue={answerText}
                              required
                              variant="outlined"
                              onChange={(e) => {
                                return handleAnswerChange(e)
                              }}
                            ></TextField>
                          )
                        })}
                    </div>
                  )}
                  {questionType === 'dropDown' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      {answerChoices !== undefined &&
                        answerChoices.length > 0 &&
                        answerChoices.map(({ answerText }, index) => (
                          <TextField
                            fullWidth
                            style={{ display: 'block', marginTop: '1rem' }}
                            key={answerText}
                            inputProps={{ 'data-index': index }}
                            defaultValue={answerText}
                            name={'answerText'}
                            required
                            variant="outlined"
                            onChange={(e) => {
                              return handleAnswerChange(e)
                            }}
                          ></TextField>
                        ))}
                    </div>
                  )}
                  {questionType === 'multipleSelect' && (
                    <div style={{ width: '100%', fontSize: 14 }}>
                      {answerChoices !== undefined &&
                        answerChoices.length > 0 &&
                        answerChoices.map(({ answerText }, index) => {
                          return (
                            <TextField
                              fullWidth
                              style={{ display: 'block', marginTop: '1rem' }}
                              key={answerText}
                              inputProps={{ 'data-index': index }}
                              defaultValue={answerText}
                              name={'answerText'}
                              required
                              variant="outlined"
                              onChange={(e) => {
                                return handleAnswerChange(e)
                              }}
                            ></TextField>
                          )
                        })}
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

export default AdminForm
