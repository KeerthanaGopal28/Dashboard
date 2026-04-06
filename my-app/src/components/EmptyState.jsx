import React from 'react'

const EmptyState = ({message}) => {
  return (
    <div style={{ textAlign: "center", padding: "20px", opacity: 0.6 }}>
       <p>{message}</p>
    </div>
  )
}

export default EmptyState
