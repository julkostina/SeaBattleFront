import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import PlayerInput from './PlayerInput';
import '../styles/Settings.css';

function Settings({ onSubmit }) {
  const [formState, setFormState] = React.useState({
    size: 8,
    volume: 30,
    player1: '',
    player2: ''
  })

  const setValue = (key, value) => {
    setFormState({
      ...formState,
      [key]: value
    })
  }

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };
  const isFormComplete = formState.size && formState.volume && formState.player1 && formState.player2;

  const stylesButton = {
    backgroundColor: isFormComplete ? "#89C8DC" : "#d3d6d6",
    color: "#000000",
    borderRadius: "30px",
    padding: "10px 40px",
    fontSize: "16px",
    border: "solid 2px #000000",
    cursor: "pointer",
    margin: "10px",
  }

  return (
    <form className='settings-board' onSubmit={submit}>
      <h1>Set up game</h1>
      <div className='settings-board-fields'>
        <div id='board-size'>
          <h3>Board size</h3>
          <FormControl id="board-size-form">
            <InputLabel id="board-size-rows-columns">Rows x Columns</InputLabel>
            <Select
              labelId="board-size-rows-columns"
              id="board-size-rows-columns"
              value={formState.size}
              label="Rows"
              onChange={(e) => setValue('size', e.target.value)}
              sx={{ borderRadius: '30px' }}
            >
              <MenuItem value={8}>8x8</MenuItem>
              <MenuItem value={10}>10x10</MenuItem>
              <MenuItem value={12}>12x12</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id='volume-control'>
          <h3>Volume</h3>
          <Slider id="volume-control-slider" value={formState.volume} onChange={(e) => setValue('volume', e.target.value)} aria-labelledby="continuous-slider" />
        </div>
        <div id='player-1'>
          <PlayerInput value='Player 1' onInput={(e) => setValue('player1', e.target.value)} />
        </div>
        <div id='player-2'>
          <PlayerInput value='Player 2' onInput={(e) => setValue('player2', e.target.value)} />
        </div>
      </div>
      <button type="submit" disabled={!isFormComplete} style={stylesButton}>Start</button>
    </form>
  )
}

export default Settings;