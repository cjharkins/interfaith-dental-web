import React, { FC, useState } from 'react'
import Header from '../components/Header'
import AdminForm from '../components/Forms/AdminForm'
import NavDrawer from '../components/Drawer/Drawer'
import { ProgressBar } from '../components/ProgressBar'
import { useBreakpoint } from '../components/MediaBreakpointProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { FormState } from '../store/form/types'
import { handleFormUpdate } from "../store/form/actions"
import Button from '@material-ui/core/Button';

const Admin: FC = (props): JSX.Element => {
  const breakpoints: any = useBreakpoint()

  const [completed, setCompleted] = useState<number>(0)

  const { questions } = useSelector<RootState, FormState>((state) => state.form)
  const form = useSelector<RootState, FormState>((state) => state.form)

  const questionsAsComponents = [
    ...questions.map((question, index) => (
      <AdminForm
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
        <NavDrawer />
        {questionsAsComponents.map((form) => form)}
        <Button style={{
            backgroundColor: "#F05033",
            position: "fixed",
            color: "white",
            top: "200px",
            right: "100px",
            fontFamily: "inherit",
            padding: ".75rem 1.5rem",
            textTransform: "none"
            }}
            onClick={() => {handleFormUpdate(form)}}>Save</Button>
      </div>
    </div>
  )
}

export default Admin
