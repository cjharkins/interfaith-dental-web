import React, { FC, createContext, useState, Provider } from 'react'
import styles from './styles'
export const ThemeContext = createContext(styles)

export const ThemeProvider: ({ children }: { children: any }) => any = ({
  children,
}) => {
  const [theme, setTheme] = useState<object>(styles)
  return (
    <ThemeContext.Provider value={styles}>{children}</ThemeContext.Provider>
  )
}
