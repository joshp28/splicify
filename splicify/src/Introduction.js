import './Introduction.css';
import React from 'react';


class Introduction extends React.Component {
    render() {
        return (
            <div className="Introduction">
                <h2>{this.props.text}</h2>
            </div>

        )
    }
}

export default Introduction;