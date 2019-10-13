import React from 'react';
import Button from '@material-ui/core/Button';



// functional component that handles the break and session timer setting.
const SetTimer = ({ type, label, value, handleClick }) => (
  <div className='SetTimer'>

    <div id={`${type}-label`}>{label}</div>

    <div className='SetTimer-setting'>

      <Button
        className="btnDecrement"
        id={`${type}-decrement`}
        onClick={() => handleClick(false, `${type}Value`)}> -
      </Button>

      <h1 id={`${type}-length`}>{value}</h1>

      <Button
        className="btnIncrement"
        id={`${type}-increment`}
        onClick={() => handleClick(true, `${type}Value`)}> +
      </Button>

    </div>

  </div>
)

export default SetTimer;