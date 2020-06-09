import React, { FC, useState } from 'react'
import Logo from './Logo'
import { LanguageSelector } from './LanguageSelector'

const Header: FC = ({ children }) => {
  const w = window.innerWidth
  const [windowWidth, setWindowWidth] = useState(w)

  window.addEventListener('resize', (e) => {
    setWindowWidth(window.innerWidth)
  })

  return (
    <div
      style={{
        background: '#EAE7DD',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        height: '80px',
        display: 'flex',
        position: 'fixed',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '0 1 550px',
          padding: '24px 30px',
        }}
      >
        <Logo windowWidth={windowWidth} />
        <pre>login</pre>
        <LanguageSelector />
      </div>
      {children}
    </div>
  )
}

export default Header
