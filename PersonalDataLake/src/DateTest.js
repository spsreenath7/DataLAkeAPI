import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class DateExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleSelect(date) {
        console.log(date);
        this.setState({
            startDate: date
        });
        console.log(this.state.startDate.toDateString());
    }

    render() {
        return (
            <div>
                <p> Date is : {this.state.startDate.toDateString()}</p>
                <br />
                <br />
                <DatePicker
                    selected={this.state.startDate}
                    onSelect={this.handleSelect}
                />

                
            </div>

        );
    }
}