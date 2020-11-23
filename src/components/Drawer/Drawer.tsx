import React, { FC, useEffect, useRef, useState } from 'react'
import { List, ListItem, Drawer } from '@material-ui/core'
import { useSelector } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu'
import { RootState } from '../../store/index'
import { FormState } from '../../store/form/types'
import './style.css'

const NavDrawer: FC<NavDrawerProps> = ({}) => {
  const { questions } = useSelector<RootState, FormState>(({ form }) => form)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div
      style={{
        backgroundColor: '#003b49',
        color: 'white',
        width: '20%',
        padding: '1rem',
        position: 'fixed',
        display: 'flex',
        zIndex: 9000,
      }}
      onClick={(): unknown => setDrawerOpen(!drawerOpen)}
    >
      <MenuIcon fontSize={'large'} />
      <div
        style={{
          fontSize: '1.2rem',
          paddingTop: '.2rem',
          paddingLeft: '1rem',
        }}
      >
        {drawerOpen ? 'Hide All Questions' : 'See All Questions'}
      </div>
      <Drawer
        style={{ width: '20%', padding: '1rem' }}
        anchor={'left'}
        open={drawerOpen}
        onClose={(): unknown => setDrawerOpen(!drawerOpen)}
      >
        <List
          style={{
            height: 'calc(100% - 195px)',
            padding: 0,
            width: '100%',
            marginTop: '195px',
          }}
        >
          {questions.map((question) => (
            <a
              key={'n' + question.questionDisplayOrder}
              href={`#view${question.questionDisplayOrder}`}
              style={{ textDecoration: 'none', top: '-100px' }}
            >
              <div style={{ padding: "0 1rem", display: 'flex' }}>
                <div style={{ padding: '8px 0', color: '#545859' }}>
                  {question.questionDisplayOrder}.
                </div>
                <ListItem style={{ color: '#003b49' }}>
                  {question.questionText}
                </ListItem>
              </div>
            </a>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

interface NavDrawerProps {}

export default NavDrawer
