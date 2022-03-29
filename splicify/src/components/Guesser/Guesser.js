import React from 'react';
import PropTypes from 'prop-types';
import './Guesser.css';

function Guesser() {


  return (  
    <div className="Home-header" >
    <h1>{"Splicify"}</h1>

    <h2>Guess your 01 album</h2>
    
    <input type="text" name="name" />
    <input type="submit" value="->" />

    </div>

  );
}




export default Guesser;
