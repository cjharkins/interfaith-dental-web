import React, { FC, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

export const LanguageSelector: FC = () => {
  const currentOptions = [
    <span>English</span>,
    <span>Espa&ntilde;ol</span>,
    <span>Arabic</span>,
  ]
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('English')

  return (
    <div
      style={{
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
