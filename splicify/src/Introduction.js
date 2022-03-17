import './Introduction.css';
import React from 'react';


class Introduction extends React.Component {
    render() {
        return (
            <div className="Introduction">
                <h1>{this.props.text}</h1>
                <h2>{this.props.text2}</h2>
                <br/>
                <h2>{this.props.text3}</h2>
                <br/>
                <h2>{this.props.text4}</h2>
                <br/>
                <h3>{this.props.step1}</h3>
                <h3>{this.props.step1Descrip}</h3>
                <h3>{this.props.step2}</h3>
                <h3>{this.props.step3}</h3>
                <br/>
            </div>

        )
    }
}

export default Introduction;