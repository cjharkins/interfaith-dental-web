import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './store/index'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from './ThemeContext'
import { MediaBreakpointProvider } from './components/MediaBreakpointProvider'

const queries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 720px)',
  md: '(max-width: 1024px)',
  lg: '(max-width: 1180px)',
  or: '(orientation: portrait)', // we can check orientation also
}

ReactDOM.render(
  // <React.StrictMode>
  <MediaBreakpointProvider queries={queries}>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </MediaBreakpointProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
