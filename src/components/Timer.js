import React from 'react';
import { delta_to_str } from '../utils/date_utils';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const on = false;
        const started = false;
        const start = 0;
        const delta = 0;
        const initial_delta = 0;
        
        this.state = {on, started, start, delta, initial_delta};
    }

    updateDelta = () => {
        const now = new Date();
        const delta = (now - this.state.start) + this.state.initial_delta;
        this.setState({delta});
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
        this.onReset()
        // show booking component
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
        if (this.state.on)
            button = {text:'Reset', handler:this.onReset}
        else {
            if (this.state.started)
                button = {text:'Resume', handler:this.onStart}
            else
                button = {text:'Start', handler:this.onStart}
        }
        return(
            <button className="ui button" onClick={button.handler}>{button.text}</button>
        )
    }

    render() { 
        return (
            <div className="ui center aligned container" style={{padding:'5em'}} >
                <h1 className="ui header center aligned">{delta_to_str(this.state.delta)}</h1>
                <div className="ui center aligned container">
                    <div className="ui buttons center aligned">
                        {this.mainButton()}
                        <button className={`ui button ${!this.state.on ? 'disabled': ''}`} onClick={this.onPause}>Pause</button>
                        <button className={`ui button ${this.state.delta < 1000 ? 'disabled': ''}`} onClick={this.onBook}>Book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;