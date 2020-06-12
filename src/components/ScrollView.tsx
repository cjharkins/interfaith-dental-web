import React, { FC } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Informational from './Informational/Informational'
import { updateCount } from '../store/ui/actions'
import { useDispatch } from 'react-redux'

interface ScrollViewProps {
  form: number | undefined
  count: number | undefined
}

const ScrollView: FC<ScrollViewProps> = ({ children, count, form }) => {
  const dispatch = useDispatch()

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
      {count === 0 ? (
        <Informational informationType="welcome" didQualify={false} />
      ) : (
        <>
          <div style={{ width: '100%', height: '685px', background: 'white' }}>
            Form
          </div>
          <a href={`#view${count}`}>
            <div
              onClick={(): unknown => dispatch(updateCount(count))}
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
        </>
      )}
      <div id={`view${count ? count : 0}`}></div>
    </div>
  )
}

export default ScrollView
