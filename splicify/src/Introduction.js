import './Introduction.css';
import React from 'react';


class Introduction extends React.Component {
    render() {
        return (
            <div className="Introduction">
                <h1>{this.props.text}</h1>
                <h2>{this.props.text2}</h2>
                <br />
            </div>

        )
    }
}

export default Introduction;