import React from 'react';
import { format } from 'date-fns'
import { milliSecTillMidnight } from '../utils/date_utils'

class BookForm extends React.Component {

    date_format = 'dd.mm.yyyy';

    constructor(props) {
        super(props);

        const date = new Date();
        const duration = this.props.duration
        const description = ''

        this.state = {date, duration, description}

        this.setDateUpdater();
    }

    setDateUpdater = () => {
        setTimeout(this.updateDate, milliSecTillMidnight());
    }

    updateDate = () => {
        const date = new Date()
        this.setState({date});
        this.setDateUpdater();
    }

    render() {
        return(
            <div className="ui center aligned container" style={{padding:'5em'}}>
                <table className="ui collapsing celled striped padded center aligned table">
                    <thead className="ui center aligned header">
                        <tr className="ui center aligned">
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{format(this.state.date, this.date_format)}</td>
                            <td>Time</td>
                            <td>{this.state.duration}</td>
                            <td>Description</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BookForm;