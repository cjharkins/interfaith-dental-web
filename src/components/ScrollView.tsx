import React, { FC } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface ScrollViewProps {
  form: number | undefined
}

const ScrollView: FC<ScrollViewProps> = ({ children, form }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 128,
      }}
    >
      <div style={{ width: '100%', height: '685px', background: 'white' }}>
        Form
      </div>
      <a href={`#view${form}`}>
        <div
          style={{
            width: '116px',
            height: '78px',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ margin: '0 auto', color: '#003B49' }}>Next</div>
          <div style={{ margin: '0 auto' }}>
            <ExpandMoreIcon style={{ color: '#003B49' }} />
          </div>
        </div>
      </a>
      <div id={`view${form}`}></div>
    </div>
  )
}

export default ScrollView
