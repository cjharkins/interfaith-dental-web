import React, { FC, useState, useEffect } from 'react'
import Header from '../components/Header'
import Form from '../components/Form'
import { ProgressBar } from '../components/ProgressBar'
import { useBreakpoint } from '../components/MediaBreakpointProvider'
import { useSelector } from 'react-redux'
import { UIState } from '../store/ui/types'
import { RootState } from '../store/index'
import { FormState } from '../store/form/types'

const Admin: FC = (props): JSX.Element => {
  const breakpoints: any = useBreakpoint()

  const [completed, setCompleted] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  const { questionsComplete = 0, informationType = '' } = useSelector<
    RootState,
    UIState
  >((state) => state.ui)

  const { questions } = useSelector<RootState, FormState>((state) => state.form)

  const getPercentage = (numCompleted: number, total: number) =>
    Math.ceil((numCompleted / total) * 100)

  useEffect(() => {
    setCompleted(getPercentage(questionsComplete, 10))
    setMessage(message)
  }, [questionsComplete, informationType])

  const questionsAsComponents = [
    ...questions.map((question, index) => (
      <Form
        key={'n' + question.questionDisplayOrder}
        count={question.questionDisplayOrder}
        answerChoices={question.answerChoices}
        questionText={question.questionText}
        questionDisplayOrder={question.questionDisplayOrder}
        questionType={question.questionType}
        lastOf={questions.length - 1 === index}
      />
    )),
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div id="viewTop" />
      <Header>
        <span style={{ width: '90%', visibility: 'hidden' }}>
          <ProgressBar completed={completed} showSmall={true} />
        </span>
      </Header>
      <div
        style={{
          display: 'flex',
          height: breakpoints.sm ? 'calc(100% - 178)' : 'calc(100% - 128px)',
          width: '100%',
          flexDirection: 'column',
          marginTop: breakpoints.sm ? 178 : 128,
        }}
      >
        {questionsAsComponents.map((form) => form)}
      </div>
    </div>
  )
}

export default Admin
