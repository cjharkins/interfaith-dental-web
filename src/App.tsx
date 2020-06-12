import React, { FC, useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import ScrolView from './components/ScrollView'
import Informational from './components/Informational/Informational'
import { useSelector } from 'react-redux'
import { UIState } from './store/ui/types'
import { RootState } from './store/index'
import { get } from 'http'

const App: FC = (props): JSX.Element => {
  const showInformational = false

  const [completed, setCompleted] = useState<number>(0)

  const { questionsComplete = 0, informationType } = useSelector<
    RootState,
    UIState
  >((state) => state.ui)

  const getPercentage = (numCompleted: number, total: number) =>
    Math.ceil((numCompleted / total) * 100)

  useEffect(() => {
    setCompleted(getPercentage(questionsComplete, 10))
  }, [questionsComplete])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Header>
        <ProgressBar completed={completed} />
      </Header>
      <div
        style={{
          display: 'flex',
          height: 'calc(100% - 128px)',
          width: '100%',
          flexDirection: 'column',
          position: 'absolute',
          top: 128,
        }}
      >
        {!showInformational &&
          [...Array(11).keys()].map((form, index) => (
            <ScrolView key={'n' + index} form={form} count={index} />
          ))}
        {showInformational && (
          <Informational informationType="smileOn60" didQualify={true} />
        )}
      </div>
    </div>
  )
}

export default App
