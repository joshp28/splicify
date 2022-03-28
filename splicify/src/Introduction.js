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
                <h1>{this.props.title}</h1>
                <br></br>
                <img src={spliced} className="Home-logo" alt="spliced" />
                <br></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>{this.props.intro1}</h3>
                <h3>{this.props.intro2}</h3>
                <br/>
                <br/>
                <br/>
                <img src={btn} className="btn" alt="btn" />
                <br/>
                <br/>
                <br/>
            </div>

        )
    }
}

export default Introduction;