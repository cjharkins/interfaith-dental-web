import React, { FC } from 'react'

interface LogoProps {
  windowWidth: number | undefined
}

const Logo: FC<LogoProps> = ({ windowWidth }) => {
  return windowWidth && windowWidth >= 1121 ? (
    <img
      height="80"
      width="336"
      src={require('../assets/images/IFD-Logo-Tag-Horizontal_CMYK.png')}
      alt="somelogo"
    />
  ) : (
    <img
      height="80"
      width="336"
      src={require('../assets/images/IFD-Logo-Tag-Horizontal_CMYK.png')}
      alt="somelogo"
    />
  )
}
export default Logo
