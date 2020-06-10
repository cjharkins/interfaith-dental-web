import React, { FC } from 'react'
import './App.css'
import Header from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import ScrolView from './components/ScrollView'

const App: FC = (props): JSX.Element => {
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
        <ProgressBar completed={40} />
      </Header>
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          position: 'absolute',
          top: 128,
        }}
      >
        {[0, 1, 2, 3].map((form, index) => (
          <ScrolView key={'n' + index} form={form} />
        ))}
      </div>
    </div>
  )
}

export default App
