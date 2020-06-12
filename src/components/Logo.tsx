import React, { FC } from 'react'

interface LogoProps {
  showSmall: boolean | undefined
}

const Logo: FC<LogoProps> = ({ showSmall }) => {
  return showSmall ? (
    <img
      style={{ order: 1 }}
      height="80"
      width="auto"
      src={require('../assets/images/IFD-Logo-Tag-Vertical_WHITE.png')}
      alt="somelogo"
    />
  ) : (
    <img
      style={{ order: 0 }}
      height="80"
      width="336"
      src={require('../assets/images/IFD-Logo-Tag-Horizontal_CMYK.png')}
      alt="somelogo"
    />
  )
}
export default Logo
