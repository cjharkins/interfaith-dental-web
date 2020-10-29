import React, { FC } from 'react'
import Logo from './Logo'
import { LanguageSelector } from './LanguageSelector'
import LoginDialogue from './LoginDialogue'
import { useBreakpoint } from './MediaBreakpointProvider'
import { connect } from 'react-redux'
import { AuthState } from '../store/auth/types'
import Logout from './Logout'

import AuthButton from './AuthButton'

interface HeaderProps {
  auth?: AuthState | undefined
}

const Header: FC<HeaderProps> = ({ auth = {}, children }) => {
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
        <AuthButton />
        <LanguageSelector style={{ order: 2 }} />
      </div>
      {children}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Header)
