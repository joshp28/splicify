import './Introduction.css';
import spliced from '../../images/Cube.png';
import btn from '../../images/Enter_btn.png';
import React, { useState } from 'react';



function Introduction() {


    const [showIntro, setShowIntro] = useState(true);

    return (
        <div>
            <header className="Home">
               
                <h2>{"Welcome to"}</h2>
                <h1>{"Splicify"}</h1>
                <img src={spliced} className="Home-logo" alt="spliced" />
                {showIntro &&
                    <div>
                        <h3>{"Your top 5 albums will be spliced onto this cube."}</h3>
                        <h3>{"Try to guess your top albums and see if your friends can guess them right!"}</h3>
                    </div>
                }
                {!showIntro &&

                    <h3>{"Creating your Splicify Now ..."}</h3>

                }   
                <img src={btn} className="btn"  onClick={() => setShowIntro(!showIntro)} />
                
            </header>
        </div>

    )
}

export default Introduction;