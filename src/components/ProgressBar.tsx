import React, { FC, useState } from 'react'

interface ProgressBarProps {
  completed: number | undefined
}

export const ProgressBar: FC<ProgressBarProps> = ({ completed }) => {
  return (
    <div
      style={{
        flex: '1 0 522px',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}
    >
      <div style={{ marginRight: 5, color: '#545859' }}>PROGRESS</div>
      <div
        style={{
          position: 'relative',
          height: 15,
          width: '100%',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: completed + '%',
            position: 'absolute',
            height: 15,
            background: '#003B49',
          }}
        />
      </div>
    </div>
  )
}
