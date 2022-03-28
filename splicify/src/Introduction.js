import './Introduction.css';
import spliced from './Cube.png';
import btn from './Enter_btn.png';
import React from 'react';


class Introduction extends React.Component {
    render() {
        return (
            <div className="Introduction">
                <br></br>
                <h2>{this.props.welcome}</h2>
                <h1>{this.props.text}</h1>
                <br></br>
                <img src={spliced} className="Home-logo" alt="spliced" />
                <br></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>{this.props.text3}</h3>
                <h3>{this.props.text4}</h3>
                <br/>
                <br/>
                <br/>
                <img src={btn} className="btn" alt="btn" />
                <br/>
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