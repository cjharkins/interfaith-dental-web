import React, { FC } from 'react'
import Logo from './Logo'
import { LanguageSelector } from './LanguageSelector'
import { LoginButton } from './LoginButton'
import { useBreakpoint } from './MediaBreakpointProvider'

const Header: FC = ({ children }) => {
  const breakpoints: any = useBreakpoint()

  return (
    <div
      style={{
        background: '#EAE7DD',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        height: breakpoints.sm ? '130px' : '80px',
        display: 'flex',
        position: 'fixed',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        zIndex: 9998,
        flexDirection: breakpoints.sm ? 'column' : 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          padding: breakpoints.sm ? '0 30px' : '24px 30px',
        }}
      >
        <Logo showSmall={breakpoints.sm} />
        <LoginButton />
        <LanguageSelector style={{ order: 2 }} />
      </div>
      {children}
    </div>
  )
}

export default Header
