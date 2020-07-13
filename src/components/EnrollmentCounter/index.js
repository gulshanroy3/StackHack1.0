import React, { Component } from 'react';
import './index.scss';

class EnrollmentCounter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='registered-student-counter-container'>
                <div className='student-counter-header'>
                    {this.props.title}
                </div>
                <div className="student-counter-wrapper">
                    {
                        this.props.count.split("").map((digit, key) => {
                            return <div className="student-counter-box" id={key}>
                                {digit}
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}
EnrollmentCounter.default = {
    title: ' Registered till date'
}
export default EnrollmentCounter;