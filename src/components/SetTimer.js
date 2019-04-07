import React from 'react';

const SetTimer = ({ type, label, value, handleClick }) => (
    <div className='SetTimer'>
      <div id={`${type}-label`}>{label}</div>
        <div className='SetTimer-setting'>
        <button id={`${type}-decrement`} onClick={() => handleClick(false, `${type}Value`)}>&darr;</button>
        <h1 id={`${type}-length`}>{value}</h1>
        <button id={`${type}-increment`} onClick={() => handleClick(true, `${type}Value`)}>&uarr;</button>
      </div>
    </div>
  )
  
export default SetTimer;