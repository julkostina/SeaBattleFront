import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import PlayerButton from './PlayerButton';
import '../styles/Settings.css';

function Settings() {
    const [size, setSize] = React.useState([]);
    const [volume, setVolume] = React.useState(30);

    function handleChange(event) {
      setSize(event.target.value);
    }

    const handleVolumeChange = (event, newValue) => {
      setVolume(newValue);
    };

  return (
    <div className='settings-board'>
      <h1>Set up game</h1>
        <div className='settings-board-fields'>
        <div id='board-size'>
        <h3>Board size</h3>
        <FormControl  id="board-size-form">
  <InputLabel  id="board-size-rows-columns">Rows x Columns</InputLabel>
  <Select 
    labelId="board-size-rows-columns"
    id="board-size-rows-columns"
    value={size}
    label="Rows"
    onChange={handleChange}
    sx={{borderRadius: '30px'}}
  >
    <MenuItem value={8}>8x8</MenuItem>
    <MenuItem value={8}>10x10</MenuItem>
    <MenuItem value={12}>12x12</MenuItem>
  </Select>
</FormControl>
        </div>
        <div id='volume-control'>
          <h3>Volume</h3>
            <Slider id="volume-control-slider"value={volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" />
        </div>
        <div id='player-1'>
          <PlayerButton value='Player 1' />
        </div>
        <div id='player-2'>
          <PlayerButton value='Player 2' />
          </div>
        </div>
    </div>
  )
}

export default Settings;