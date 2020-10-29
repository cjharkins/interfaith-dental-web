import React, { FC, useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { getQuestions } from '../store/form/actions'
import { useDispatch } from 'react-redux'

interface LanguageSelectorProps {
  style?: object | undefined
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ style }) => {
  const dispatch = useDispatch()

  const currentOptions = [
    <span key={'English'}>English</span>,
    <span key={'Espanol'}>Espa&ntilde;ol</span>,
    <span key={'Arabic'}>Arabic</span>,
  ]
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('English')

  useEffect(() => {
    dispatch(getQuestions(selectedOption))
  }, [selectedOption])

  return (
    <div
      style={{
        ...style,
        position: 'relative',
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div style={{ color: '#545859' }}>{selectedOption}</div>
        <ExpandMoreIcon style={{ color: '#545859' }} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: -15,
          top: 30,
          background: '#EAE7DD',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          width: 100,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showOptions &&
          currentOptions.map((opt, index) => {
            return (
              <div key={opt.props.children}>
                <div
                  style={{
                    cursor: 'pointer',
                    width: 100,
                    padding: '15px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: '#8C8279',
                  }}
                  onClick={() => {
                    setShowOptions(false)
                    setSelectedOption(opt.props.children)
                  }}
                >
                  {opt}
                </div>
                {index + 1 !== currentOptions.length ? (
                  <hr style={{ width: '80%' }} />
                ) : (
                  <></>
                )}
              </div>
            )
          })}
        {showOptions && (
          <ExpandLessIcon
            onClick={() => setShowOptions(false)}
            style={{ cursor: 'pointer', color: '#8C8279', paddingBottom: 10 }}
          />
        )}
      </div>
    </div>
  )
}
