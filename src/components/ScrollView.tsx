import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Informational from './Informational/Informational'
import { updateCount } from '../store/ui/actions'
import { useDispatch } from 'react-redux'
import { useBreakpoint } from './MediaBreakpointProvider'

interface ScrollViewProps {
  count: number | undefined
}

const ScrollView: FC<ScrollViewProps> = ({ children, count = 0 }) => {
  const dispatch = useDispatch()
  const breakpoints: any = useBreakpoint()

  const [valid, setValid] = useState<boolean>(false)

  const scrollRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    const bounds =
      scrollRef &&
      scrollRef.current &&
      scrollRef.current.getBoundingClientRect()
    if (!valid) {
      const x = bounds && bounds.x
      const y = bounds && bounds.y + 178
      if (x !== null && y !== null) {
        window.onscroll = function () {
          window.scrollTo(x, y)
        }
      }
      console.log(
        scrollRef &&
          scrollRef.current &&
          scrollRef.current.getBoundingClientRect(),
        count
      )
    }
  }, [valid])

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: breakpoints.sm ? 170 : 128,
      }}
    >
      <div style={{ height: '100%', width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
          }}
        >
          <div
            style={{
              width: breakpoints.sm ? '100%' : 700,
              // height: breakpoints.sm ? '478px' : '685px',
              // maxHeight: breakpoints.sm ? '578px' : '685px',
              background: 'white',
            }}
          >
            <QuestionHeader count={count} />
            <div style={{ padding: '0 30px 30px' }}>{children}</div>
          </div>
        </div>
        <a
          style={{ textDecoration: 'none' }}
          href={valid ? `#view${count}` : `#view${count - 1}`}
        >
          <div
            onClick={(): unknown => {
              setValid(false)
              dispatch(updateCount(count))
              return
            }}
            style={{
              width: '116px',
              height: 'max-content',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 0,
              margin: '0 auto',
            }}
          >
            <div style={{ margin: '0 auto', color: '#003B49' }}>NEXT</div>
            <div style={{ margin: '-10px auto 0' }}>
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
      </div>
      <div ref={scrollRef} id={`view${count ? count : 0}`} />
    </div>
  )
}

interface QuestionHeaderProps {
  count: number | undefined
}

const QuestionHeader: FC<QuestionHeaderProps> = ({ count = 1 }) => {
  const breakpoints: any = useBreakpoint()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 30px',
      }}
    >
      <div
        style={{
          width: breakpoints.sm ? '100%' : 700,
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
            <h3 style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>
              {count}.
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollView
