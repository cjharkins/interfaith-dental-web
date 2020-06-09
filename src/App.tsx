import React, { FC } from 'react'
import './App.css'
import Header from './components/Header'
import { ProgressBar } from './components/ProgressBar'

const App: FC = (props): JSX.Element => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Header>
        <ProgressBar completed={40} />
      </Header>
    </div>
  )
}

export default App
