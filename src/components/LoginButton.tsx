import React, { FC, useState } from 'react'

interface LoginButtonProps {
  style?: object | undefined
}

export const LoginButton: FC<LoginButtonProps> = ({ style }) => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div
      style={{
        ...style,
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#545859',
      }}
      onClick={() => setShowLogin(!showLogin)}
    >
      Login
    </div>
  )
}
