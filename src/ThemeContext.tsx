import React, { createContext } from 'react'
import styles from './styles'
export const ThemeContext = createContext(styles)

export const ThemeProvider: ({ children }: { children: any }) => any = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={styles}>{children}</ThemeContext.Provider>
  )
}
