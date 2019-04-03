import React from 'react';
import './App.css';

class App extends React.Component {

  constructor () {
    super()
    this.state = {
        cycle: "Session",
        workTime: 20,
        breakTime: 5,
        timerId: 0,
        timerRunning: false,
        currentTime: "20 : 00",
    }
}
render() {
    return (
        <div className="main">
            <h1>My PomoClock</h1>
            <Timer />
            <TimerControllers 
            workTime={this.state.workTime}
            breakTime={this.state.breakTime}
            incrementWorkTime={this.incrementWorkTime}
            decrementWorkTime={this.decrementWorkTime}
            incrementBreakTime={this.incrementBreakTime}
            decrementBreakTime={this.decrementBreakTime}
            />
        </div>

    );
}

incrementWorkTime = () => {
  this.setState({
    workTime: this.state.workTime +1
  })
}
decrementWorkTime = () => {
  this.setState({
    workTime: this.state.workTime -1
  })
}
incrementBreakTime = () => {
  this.setState({
    breakTime : this.state.breakTime +1
  })
}
decrementBreakTime = () => {
  this.setState({
    breakTime : this.state.breakTime -1
  })
}
}

  // startTimer = (duration) => {
  //   this.setState({timerRunning: true})
  //   let time = duration * 60
  //   let minutes;
  //   let seconds;
  //   let runningTimer = setInterval(() => {
  //     this.setState({
  //       timerId: runningTimer
  //     })
  //     minutes = Math.floor(time /60)
  //     seconds = time - minutes * 60
  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;
  //     this.setState({currentTime: `${minutes} : ${minutes}`})
  //     if (time == 0) {
  //       if(this.state.cycle === "Session"){
  //         this.setState({
  //           cycle: "Break",
  //           timerRunning: false
  //         })
  //         clearInterval(this.state.timerId)
  //         this.startTimer(this.state.breakTime)
  //       }else {
  //         this.setState({
  //           cycle: "Session",
  //           timerRunning: false
  //         })
  //         clearInterval(this.state.timerId)
  //         this.startTimer(this.state.workTime)
  //       }
  //     }
  //   })
  // }

class Timer extends React.Component {
  timer = () => {
    if (this.props.timerRunning === true) {
      clearInterval(this.props.timerId)
      this.props.setCurrentTime("20 : 00")
      this.props.setTimerRunning()
    } 
    else {
      this.props.cycle === "Session" ? 
      this.props.startTimer(this.props.workTime) : 
      this.props.startTimer(this.props.breakTime)
    }
  }
  render() {
      return (
          <div className="timer">
              <button className="count-down" onClick={this.timer}>
                {this.props.currentTime} Start
              </button>
              <span>{this.props.cycle}</span>
          </div>
      )
  }
}

class TimerControllers extends React.Component {
  render() {
      return (
          <div className="timer-controllers">
              <WorkController 
                workTime={this.props.workTime}
                incrementWorkTime={this.props.incrementWorkTime}
                decrementWorkTime={this.props.decrementWorkTime}
                />

              <BreakController 
                breakTime={this.props.breakTime}
                incrementBreakTime={this.props.incrementBreakTime}
                decrementBreakTime={this.props.decrementBreakTime}
              />
          </div>
      )
  }
}

class WorkController extends React.Component {

  handleWorkIncrement = () => {
    this.props.incrementWorkTime()
    if (this.props.timerRunning === false) {
      this.props.setCurrentTime(this.props.workTime)
    }
  }

  handleWorkDecrement = () => {
    this.props.decrementWorkTime()
    if(this.props.timerRunning === false) {
      this.props.setCurrentTime(this.props.workTime)
    }
  }

  render(){
      return(
          <div className="controller">
          <p>Work</p>
          <button onClick={this.handleWorkIncrement}> + </button>
          <span> {this.props.workTime}</span>
          <button onClick={this.handleWorkDecrement}> - </button>
          </div>
      )
  }
}

class BreakController extends React.Component {

  handleBreakIncrement = () => {
    this.props.incrementBreakTime()
  }

  handleBreakDecrement = () => {
    this.props.decrementBreakTime()
  }

  render() {
      return(
          <div className="controller">
          <p>Break</p>
              <button onClick={this.handleBreakIncrement}> + </button>
              <span> {this.props.breakTime} </span>
              <button onClick={this.handleBreakDecrement}> - </button>
          </div>
      )
  }
}

export default App;
