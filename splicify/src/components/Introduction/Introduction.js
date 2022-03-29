import './Introduction.css';
import spliced from '../../images/Cube.png';
import btn from '../../images/Enter_btn.png';
import React, { useState } from 'react';



function Introduction() {
    // make background black
    document.body.style.backgroundCOlor = "#AA0000";


    const [showIntro, setShowIntro] = useState(true);



    return (
        <div className="Introduction">
            <header className="Home-header">
                <br></br>
                <h2>{"Welcome to"}</h2>
                <h1>{"Splicify"}</h1>
                <br></br>
                <img src={spliced} className="Home-logo" alt="spliced" />
                <br></br>
                <br />
                <br />
                <br />
                <br />
                <br />
                {showIntro &&
                    <div showIntro>
                        <h3>{"Your top 5 albums will be spliced onto this cube."}</h3>
                        <h3>{"Try to guess your top albums and see if your friends can guess them right!"}</h3>
                    </div>
                }
                {!showIntro &&

                    <h3>{"Creating your Splicify Now ..."}</h3>

                }   
                <br />
                <br />
                <br />
                <button><img src={btn} className="btn" alt="btn" onClick={() => setShowIntro(!showIntro)}/></button>
                <br />
                <br />
                <br />
            </header>
        </div>

    )
}

export default Introduction;