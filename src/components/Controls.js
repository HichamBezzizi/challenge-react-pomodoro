import React from 'react';
import Button from '@material-ui/core/Button';

const Controls = ({ active, handleReset, handlePlayPause }) => (
  <div className='Controls'>

    <Button
      id='start_stop'
      onClick={handlePlayPause}>
      {active ? <span>PAUSE</span> : <span>START</span>}

    </Button>

    <Button
      id='reset'
      onClick={handleReset}>RESET
    </Button>
  </div>
)

export default Controls;