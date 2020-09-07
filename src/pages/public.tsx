import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import { ProgressBar } from '../components/ProgressBar'
import ScrolView from '../components/ScrollView'
import Informational from '../components/Informational/Informational'
import { useBreakpoint } from '../components/MediaBreakpointProvider'
import { useSelector } from 'react-redux'
import { UIState } from '../store/ui/types'
import { RootState } from '../store/index'
import Question1 from '../components/Forms/Question1'
import Question2 from '../components/Forms/Question2'

const Public: FC = (props): JSX.Element => {
  const breakpoints: any = useBreakpoint()
  const showInformational = false

  const [completed, setCompleted] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  const { questionsComplete = 0, informationType = '' } = useSelector<
    RootState,
    UIState
  >((state) => state.ui)

  const getPercentage = (numCompleted: number, total: number) =>
    Math.ceil((numCompleted / total) * 100)

  useEffect(() => {
    setCompleted(getPercentage(questionsComplete, 10))
    setMessage(message)
  }, [questionsComplete, informationType])

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
        <ProgressBar completed={completed} showSmall={true} />
      </Header>
      <div
        style={{
          display: 'flex',
          height: breakpoints.sm ? 'calc(100% - 178)' : 'calc(100% - 128px)',
          width: '100%',
          flexDirection: 'column',
          // position: 'absolute',
          marginTop: breakpoints.sm ? 178 : 128,
        }}
      >
        {!showInformational &&
          [
            <Informational
              key={'welcome'}
              informationType="welcome"
              didQualify={false}
            />,
            <Question1 key={'question1'} />,
            <Question2 key={'question2'} />,
            <Question2 key={'question3'} />,
            <Question2 key={'question4'} />,
          ].map((form, index) => {
            return index === 0 ? (
              form
            ) : (
              <ScrolView key={'n' + index} count={index}>
                {form}
              </ScrolView>
            )
          })}
        {showInformational && (
          <Informational informationType="smileOn60" didQualify={true} />
        )}
      </div>
    </div>
  )
}

export default Public
