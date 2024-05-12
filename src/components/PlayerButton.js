import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function PlayerButton({value}) {
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
      <TextField id="filled-basic" label="Enter name" variant="filled" />
    </Box>
    </div>
  )
}

export default PlayerButton