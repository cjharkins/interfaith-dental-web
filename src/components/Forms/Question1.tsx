import React, {FC, useEffect, useState} from 'react'
import { useBreakpoint } from '../MediaBreakpointProvider'

const Question1: FC = () => {
  const [checked, setChecked] = useState<string>('')
  const breakpoints: any = useBreakpoint()

  useEffect(() => {
    console.log('dispatch checked with selection of ' + checked)
  }, [checked])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: breakpoints.sm ? '100%' : 700,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontSize: breakpoints.sm ? '1.5em' : 36 }}>{"I'm a ..."}</p>
        <div style={{ width: '100%', fontSize: 14 }}>
          {[
            'Patient',
            'Family Member',
            'Interfaith Dental Staff',
            'Case Worker',
          ].map((val, index) => {
            return (
              <div
                key={val}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  borderTop: '1px solid lightgrey',
                  borderBottom:
                    val === 'Case Worker' ? '1px solid lightgrey' : 'none',
                  width: '100%',
                  padding: '15px 0',
                }}
              >
                <input
                  type="radio"
                  onChange={() => setChecked(val)}
                  checked={checked === val}
                />{' '}
                {val}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Question1
