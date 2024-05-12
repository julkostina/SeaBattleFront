import React from 'react'

function Button({id,value, onClick}) {
  return (
    <button sx={{fontWeight:"bold"}}key={id} id={id}  onClick={onClick}>{value}</button>
  )
}

export default Button