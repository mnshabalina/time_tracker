import React from 'react';
import { delta_to_str } from '../utils/date_utils';
import BookForm from './BookForm';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const on = false;
        const started = false;
        const start = 0;
        const delta = 0;
        const delta_str = '00:00:00';
        const initial_delta = 0;
        const booking = false;
        const booking_duration = '00:00:00';
        
        this.state = {on, started, start, delta, delta_str, initial_delta, booking, booking_duration};
    }

    updateDelta = () => {
        const now = new Date();
        const delta = (now - this.state.start) + this.state.initial_delta;
        const delta_str = delta_to_str(delta)
        this.setState({delta, delta_str});
    }

    setDeltaUpdater = () => {
        this.deltaUpdater = setInterval(this.updateDelta, 1000);
    }

    onStart = () => {
        const on = true;
        const started = true;
        const start = new Date();
        this.setState({on, start, started});
        this.setDeltaUpdater();
    }

    onPause = () => {
        clearInterval(this.deltaUpdater);
        const on = false;
        const initial_delta = this.state.delta;
        this.setState({on, initial_delta});
    }

    onBook = () =>{
        const booking = true;
        const booking_duration = this.state.delta_str;
        this.setState({booking, booking_duration});
        this.onReset();
    }

    onReset = () =>{
        clearInterval(this.deltaUpdater)
        const on = false;
        const started = false;
        const delta = 0;
        const initial_delta = 0;
        this.setState({on, started, delta, initial_delta})
    }

    mainButton = () => {
        let button;
        const className = `ui button ${this.state.booking ? 'disabled': ''}`;
        if (this.state.on)
            button = {text:'Reset', handler:this.onReset}
        else {
            if (this.state.started)
                button = {text:'Resume', handler:this.onStart}
            else
                button = {text:'Start', handler:this.onStart}
        }
        return(
            <button className={className} onClick={button.handler}>{button.text}</button>
        )
    }

    render() { 
        return (
            <div className="ui center aligned container" style={{padding:'5em'}} >
                <h1 className="ui center aligned header">{this.state.delta_str}</h1>
                <div className="ui center aligned container">
                    <div className="ui buttons">
                        {this.mainButton()}
                        <button className={`ui button ${(!this.state.on || this.state.booking) ? 'disabled': ''}`} onClick={this.onPause}>Pause</button>
                        <button className={`ui button ${(this.state.delta < 1000 || this.state.booking) ? 'disabled': ''}`} onClick={this.onBook}>Book</button>
                    </div>
                </div>
                <BookForm duration={this.state.booking_duration} />
            </div>
        );
    }
}

export default Timer;