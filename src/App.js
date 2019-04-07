import React from 'react';
import Controls from './components/Controls';
import Header from './components/Header';
import Timer from './components/Timer';
import SetTimer from './components/SetTimer';
import './App.css';

const moment = require('moment');

class PomodoroApp extends React.Component {
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

export default PomodoroApp;