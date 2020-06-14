import React, { FC } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
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
        <>
          <Informational informationType="welcome" didQualify={false} />
        </>
      ) : (
        <>
          <div style={{ width: '100%', height: '685px', background: 'white' }}>
            <QuestionHeader count={count} />
          </div>
          <a style={{ textDecoration: 'none'}} href={`#view${count}`}>
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
              <div style={{ margin: '5px auto 0', color: '#003B49' }}>NEXT</div>
              <div style={{ margin: '0 auto' }}>
                <ExpandMoreIcon
                  style={{
                    width: 45,
                    height: 'auto',
                    color: '#003B49',
                  }}
                />
              </div>
            </div>
          </a>
        </>
      )}
      <div id={`view${count ? count : 0}`} />
    </div>
  )
}

interface QuestionHeaderProps {
  count: number | undefined
}

const QuestionHeader: FC<QuestionHeaderProps> = ({ count = 1 }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          width: 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <a href={`#view${count === 1 ? 'Top' : count - 2}`}>
          <ExpandLessIcon
            style={{
              marginTop: 15,
              width: 38,
              height: 'auto',
              color: '#003B49',
            }}
          />
        </a>
        <div style={{ width: '100%' }}>
          <div style={{ borderBottom: '2px solid #EE2737', width: 120 }}>
            <h3 style={{ fontSize: 36 }}>{count}.</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollView
