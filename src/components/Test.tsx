import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../store/test/actions'

const Test: FC = () => {
  const dispatch = useDispatch()

  dispatch(getData())

  return <div>This is a test.</div>
}

export default Test
