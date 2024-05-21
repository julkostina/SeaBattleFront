import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function PlayerInput({ value, onInput }) {

  return (
    <div>
      <h3>{value}</h3>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch', },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="filled-basic" label="Enter name" variant="filled" onInput={onInput} />
      </Box>
    </div>
  )
}

export default PlayerInput