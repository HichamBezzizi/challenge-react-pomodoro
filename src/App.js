import React from 'react';
import Controls from './components/Controls';
import { Header } from './components/Header';
import Timer from './components/Timer';
import SetTimer from './components/SetTimer';
import Container from '@material-ui/core/Container';
import './App.css';

const moment = require('moment');

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakValue: 5,
      sessionValue: 20,
      time: 20 * 60 * 1000,
      active: false,
      touched: false,
      mode: 'session',
    }
  }

  // componentDidUpdate = ()  => {

  //   if(this.state.time == 0  && this.state.mode === 'break') {
  //     this.setState({time: this.state.breakValue * 60 * 1000, mode: 'session'})
  //   }
  //   if(this.state.time === 0 && this.state.mode === 'break'){
  //     this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session'})
  //   }

  // }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.time === 0 && prevState.mode === 'session') {
      this.setState({
        time: this.state.breakValue * 60 * 1000, mode: 'break'
      })
      this.audio.play();
    }

    if (prevState.time === 0 && prevState.mode === 'break') {
      this.setState({
        time: this.state.sessionValue * 60 * 1000, mode: 'session'
      })
      this.audio.play();
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
    } else {
      if (!this.state.touched) {
        this.setState({
          time: this.state.sessionValue * 60 * 1000,
          active: true,
          touched: true
        }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000)
        )
      } else {
        this.setState({
          active: true,
          touched: true
        }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000))
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

    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.pomodoro);

  }
  render() {
    return (
      <Container maxWidth="md" className="appContainer">
        <div>
          <Header />
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
          <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')} />
          <Controls active={this.state.active} handleReset={this.handleReset} handlePlayPause={this.handlePlayPause} />
          <audio
            id='beep'
            src='https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
            ref={ref => this.audio = ref}>
          </audio>
        </div>
      </Container>
    );
  }
}

