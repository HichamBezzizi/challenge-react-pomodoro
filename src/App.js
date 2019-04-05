import React from 'react';
import './App.css';
const moment = require('moment');

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      breakValue: 5,
      sessionValue: 20,
      time: 20 * 60 * 1000,
      active: false,
      mode: 'session'
    }
  }
  handleSetTimers = (inc, type) => {
    if (inc && this.state[type] === 60) return
    if (!inc && this.state[type] === 1) return
    this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
  }

  handlePlayPause = () => {
    if (this.state.active) {
      this.setState({ active: false }, () => clearInterval(this.pomodoro))
    } 
    else {
      if (!this.state.touched) {
        this.setState({ 
          time: this.state.sessionValue * 60 * 1000, 
          active: true, 
          touched: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }) ,1000)
        )} else {
            this.setState({
              active: true,
              touched: true
            }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }) ,1000))
        }
    }
  }
  
  handleReset = () => {
    this.setState({ 
      breakValue: 5, 
      sessionValue: 20, 
      time: 20 * 60 * 1000, 
      active: false, 
      mode: 'session',
      touched: false
    })
    clearInterval(this.pomodoro)
  }
  render(){
    return(
    <div>
      <Header/>
      <div className='settings'>
        <SetTimer 
          type='break' 
          label='Break' 
          value={this.state.breakValue}
          handleClick={this.handleSetTimers}
        />
        <SetTimer 
          type='session' 
          label='Session' 
          value={this.state.sessionValue}
          handleClick={this.handleSetTimers}  
        />
      </div>
      <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')}/>
      <Controls active={this.state.active} handleReset={this.handleReset} handlePlayPause={this.handlePlayPause}/>
    </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <div>
      <h1 className="header">Pomodoro Clock</h1>
    </div>
  }
}


const SetTimer = ({ type, label, value, handleClick }) => (
  <div className='SetTimer'>
    <div id={`${type}-label`}>{label}</div>
      <div className='SetTimer-controls'>
      <button id={`${type}-decrement`} onClick={() => handleClick(false, `${type}Value`)}>&darr;</button>
      <h1 id={`${type}-length`}>{value}</h1>
      <button id={`${type}-increment`} onClick={() => handleClick(true, `${type}Value`)}>&uarr;</button>
    </div>
  </div>
)

const Timer = ({ mode, time }) => (
  <div className='Timer'>
    <h1 id='timer-label'>{mode === 'session' ? 'Session ' : 'Break '}</h1>
    <h1 id='time-left'>{time}</h1>
  </div>
)

const Controls = ({ active, handleReset, handlePlayPause }) => (
  <div className='Controls'>
    <button id='start_stop' onClick={handlePlayPause}>{ active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span> }</button>
    <button id='reset' onClick={handleReset}>&#8635;</button>
  </div>
)



export default App;