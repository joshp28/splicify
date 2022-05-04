// import React, { Component } from 'react';
import React, { Component, useState } from "react";
import './Guesser.css';
import cover from '../../images/boypablo-feelinglonely.jpg';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";

import Box from '@mui/material/Box';

import Results from '../Results/Results.js';

import Button from '@mui/material/Button';

import loaded from "../../spotify_info.json";

import mute from '../../images/mute_play.svg';
import audioBtn from '../../images/Audio.svg';
import { Link } from 'react-router-dom';
// import { browserHistory } from 'react-router-dom';
import { stepIconClasses } from "@mui/material";


var data = loaded;
var mydata = JSON.parse(data);
var copyData = JSON.parse(data);

const top100Songs = copyData.songs.sort(() => Math.random() - 0.5);


var autoInput = "";

let cssfilter;


var image1 = new Image();
image1.crossOrigin = "anonymous";
var image2 = new Image();
image2.crossOrigin = "anonymous";
var image3 = new Image();
image3.crossOrigin = "anonymous";
var image4 = new Image();
image4.crossOrigin = "anonymous";
var image5 = new Image();
image5.crossOrigin = "anonymous";

var isPlaying = false;
var playing = false;
var resultsFlag;



var audio;
class Guesser extends Component {
  state = {
    tries: 0,
    results: false,
    correct: 0,
    answers: [],
    loaded,
    audio: new Audio(mydata.songs[0].preview_url),
    isPlaying,
    albumNum: 0,
    hints: 0
  };
  
  componentDidMount() {
    this.cropImg();
    document.getElementById('failed').style.display = 'none'
    document.getElementById('passed').style.display = 'none'
    document.getElementById('guesser').style.display = ''
    document.getElementById('next').style.display = 'none'
    document.getElementById('artistHint').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    document.getElementById('getResults').style.display = 'none';
    return;
  }

  

  playPause = () => {
    // let { answers, input, loaded, audio, isPlaying, albumNum, tries, correct } = this.state;
    // Get state of song    

    let play = this.state.isPlaying;
    console.log(play);
    const btn = document.getElementById("playBtn");

    this.state.audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    
    if (play) {
      // Pause the song if it is playing
      this.state.audio.muted = true;
      document.getElementById("mute").src = mute;
    } else {

      // Play the song if it is muted
      this.state.audio.muted = false;
      document.getElementById("mute").src = audioBtn;
      this.state.audio.play();      
      this.setState({ isPlaying: !isPlaying });
    }
    this.state.isPlaying = false;
  };
  
  
  setPlay(albumNum) {
    
    const btn = document.getElementById("playBtn");
    console.log(playing);

    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);

    if (playing === false) {
      audio.play();
      playing = true;
      btn.innerText = "PAUSE";
      console.log("play");
    }
    else if (playing === true) {
      audio.muted = true;
      playing = false;
      audio.pause();
      console.log("pausedddd");
    }
    
  }

  
  saveInput = (e) => {
    this.setState({ input: e.target.value });
    return;
  };

  addNewItem = () => {
    let { answers, input, loaded, audio, isPlaying, albumNum, tries, correct } = this.state;
    console.log("ADDNEWITEM");
    this.cropImg();

    // guess three times and activate hints on each wrong submission
    // guess it right
    if (input != null && input.toLowerCase() === mydata.songs[albumNum].song_artist.toLowerCase()) {
    // if (input != null && input.toLowerCase() === this.getArtists().toLowerCase()) {
      
      answers.push("Correct");
      // console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      console.log(input);
      this.setState({ correct: correct + 1 });
      document.getElementById('passed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';
      // console.log(spotify[albumNum].song_title);getArtists
    }
    else if (autoInput != null && autoInput.toLowerCase() === mydata.songs[albumNum].song_artist.toLowerCase()) {
    // else if (autoInput != null && autoInput.toLowerCase() === getArtists().toLowerCase()) {

      // console.log(autoInput);
      // console.log(spotify[albumNum].song_title);
      // console.log(albumNum);
      // this.setState({ albumNum: this.state.albumNum + 1, tries: 0 });


      answers.push("Correct");
      console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      // console.log(answers);
      this.setState({ correct: correct + 1 });
      document.getElementById('passed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';



    }
    // guess it wrong
    else if (tries == 2) {
      answers.push("Incorrect");
      console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      document.getElementById('failed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('artistHint').style.display = 'none';
    }
    // guess wrong but have more submissions
    else {
      this.setState({ input: null, tries: tries + 1 });
      document.getElementById('hintButton').style.display = '';
      console.log(mydata.songs[albumNum].song_artist.toLowerCase());

    }

    if (this.state.answers.length === 5) {
     
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = 'none';
      document.getElementById('getResults').style.display = '';
     
    }

    return;
  };

  getArtists = (currAlbumNum) => {
    var artists = "";
    let artsitArray = mydata.songs[this.state.albumNum].song_artist;
    let artistLength = mydata.songs[this.state.albumNum].song_artist.length;
    for (var i = 0; i < artistLength; i++) {
      if (artsitArray[i] === ",") {
        if (artsitArray[i+1] === " " && artsitArray[i+2] === "]") {
          continue;
        }
        
        else {
          artists += " AND";
        }
      }
      else if (artsitArray[i] === "[") {
        continue;
      }
      else if (artsitArray[i] === "]") {
        continue;
      }
      else if (artsitArray[i] === '"') {
        artists += artsitArray[i];
      }
      else {
        artists += artsitArray[i];
      }
      
      console.log(artists);

    }
    return artists.toUpperCase();
  }

  parseGetArtists = (songTitle) => {
    // var artists = "A";

    let artsitArray = mydata.songs[this.state.albumNum].song_artist;
    let artistLength = mydata.songs[this.state.albumNum].song_artist.length;
    console.log("PARSING ARTSIT");
    // for (var i = 0; i < artistLength; i++) {
    //   if (artsitArray[i] === ",") {
    //     if (artsitArray[i+1] === " " && artsitArray[i+2] === "]") {
    //       continue;
    //     }
        
    //     else {
    //       artists += " AND";
    //     }
    //   }
    //   else if (artsitArray[i] === "[") {
    //     continue;
    //   }
    //   else if (artsitArray[i] === "]") {
    //     continue;
    //   }
    //   else if (artsitArray[i] === '"') {
    //     artists += artsitArray[i];
    //   }
    //   else {
    //     artists += artsitArray[i];
    //   }
      
    //   console.log(artists);

    // }
    return artsitArray.toUpperCase();
  }

  // getArtists = () => {
  //   var artists = "";
  //   let artsitArray = mydata.songs[this.state.albumNum].song_artist;
  //   let artistLength = mydata.songs[this.state.albumNum].song_artist.length;
  //   if (artistLength > 1) {
  //     artists += "S ARE ";
  //   }
  //   else {
  //     artists += " IS ";
  //   }
  //   for (var i = 0; i < artistLength; i++) {
  //     if (artsitArray[i] === ",") {
  //       if (artsitArray[i+1] === " " && artsitArray[i+2] === "]") {
  //         continue;
  //       }
        
  //       else {
  //         artists += " AND";
  //       }
  //     }
  //     else if (artsitArray[i] === "[") {
  //       continue;
  //     }
  //     else if (artsitArray[i] === "]") {
  //       continue;
  //     }
  //     else if (artsitArray[i] === '"') {
  //       artists += artsitArray[i];
  //     }
  //     else {
  //       artists += artsitArray[i];
  //     }
      
  //     // console.log(artists);

  //   }
  //   return artists.toUpperCase();
  // }

  getHint = () => {
    if (this.state.hints == 0) {
      document.getElementById('artistHint').style.display = '';
      document.getElementById('hintButton').style.display = 'none';
      var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'Hint 2';
      this.setState({ hints: 1 });
    }
    else {
      this.setPlay(this.state.albumNum);
    }
    return
  }

  nextAlbum = () => {
    this.state.albumNum+=1;
    this.input = null;
    this.hints = 0;
    this.tries = 0;
    this.state.audio.pause();
    this.state.audio = new Audio(mydata.songs[this.state.albumNum].preview_url);
    document.getElementById("mute").src = mute;

    // this.playPause();
    
    this.setState({ hints: 0, input: null, albumNum: this.state.albumNum, tries: 0 });
    
    document.getElementById('guesser').style.display = '';
    document.getElementById('passed').style.display = 'none';
    document.getElementById('failed').style.display = 'none';
    document.getElementById('next').style.display = 'none'
    document.getElementById('artistHint').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    this.cropImg();
    var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'Hint 1';

    return;
  }
  
  getResults = () => {
    resultsFlag = true;
    this.setImageResults();
    document.getElementById('passed').style.display = 'none';
    document.getElementById('failed').style.display = 'none';
    this.setState({ results: true });
    document.getElementById('guesserblock').style.display = 'none';
    return;
  }

  roundedImage(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  setImage1() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "grayscale(1)"
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
      

    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "grayscale(1)"
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "grayscale(1)"
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }
    
  }

  setImage2() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
      

    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }
  }

  setImage3() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
      

    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }

  }

  setImage4() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }

  }

  setImage5() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "grayscale(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }

  }

  setImageResults() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    console.log("RESULT PIC");

    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);            
    }

    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 60, 0, 60, 300);
    }

    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
    }

    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      cssfilter = "brightness(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    
    }

  }


  cropImg() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    image1.src = mydata.songs[0].image_url;
    if (this.state.albumNum + 1 == 1) {
      this.setImage1();
    }
    if (this.state.albumNum + 1 === 2) {
      this.setImage2();
    }
    else if (this.state.albumNum + 1 === 3) {
      this.setImage3();
    }
    else if (this.state.albumNum + 1 === 4) {
      this.setImage4();
    }
    else if (this.state.albumNum + 1 === 5) {
      this.setImage5();
    } 
    
  }

  
  handleHome = () => {
    // browserHistory.push('/');
    document.getElementById("spliceHome").addEventListener('click', function(){
      console.log('h1 has been clicked');
    });
    
  }


  render() {   
    
    
    

    return (
      <div className="Home" >
        <div className='vl' />
        <h1 className='scoreheader'>SCORE: {this.state.correct}/5</h1>
        {/* <h1 id="spliceHome" component={Link} to="/">{"SPLICIFY"}</h1> */}
        <h1 id="spliceHome" component={Link} to="/">
          <Link to="/" id="spliceHomeLink">SPLICIFY</Link>
        </h1>
        
        
        <hr className="block" />
        <div id='guesserblock'>
          <h2>DO YOU KNOW WHAT WHO WROTE SPLICE {this.state.albumNum + 1}?</h2>
          <h2 id='artistHint'>HINT: THE ARTIST{this.getArtists()}</h2>
          <canvas className="canvas" ref='canvas' id="canvas" width={300} height={300}></canvas>
          <div className='textbox' id='guesser' >
            {/* <input autoComplete="off" type="text" id="input" onChange={this.saveInput} /> */}
            <Button id='hintButton' onClick={() => { this.getHint() }}>HINT 1</Button>

            <Autocomplete
              id="highlights-demo"
              freeSolo
              autoSelect
              sx={{ width: 600, margin: 'auto'}}
              // options={top100Songs.map((option) => this.parseGetArtists(option.song_artist))}
              options={top100Songs.map((option) => option.song_artist)}
              onChange={(event, v) => autoInput = v}
              renderInput={(params) => (
                <div id="container">
                  <Box
                    sx={{
                      width: '60%',
                      margin: 'auto'
                    }}
                  >

                    <TextField id="input"  {...params} sx={{ position: "center", background: "white", input: { color: 'black' } }} label="Guess your artist!" margin="normal" onChange={this.saveInput} />
                  </Box>
                </div>

              )}
            />
            <Button variant="contained" type="submit" onClick={() => { this.addNewItem(); }}>
              Submit
            </Button>
            <br />
            <br />
            {/* <button onClick={() => { this.addNewItem(); document.getElementById('input').value = ''; }}> Submit </button> */}
          </div>

          <br />
          <Button variant="contained" id='next' onClick={() => { this.nextAlbum() }}>
            Next
          </Button>
          <Button variant="contained" id='getResults' onClick={() => { this.getResults() }}>
            Results
          </Button>
          {/* <Button id='playBtn' component={Link} to="/guesser/" onClick={() => { this.playPause();}}>
            <img src = {mute} id = "mute"/>
          </Button> */}
          <Button id='playBtn' onClick={() => { this.playPause();}}>
            <img src = {mute} id = "mute"/>
          </Button>
          {/* <button onClick={() => { this.nextAlbum() }} id='next'> Next </button> */}
        </div>
        {this.state.results && <Results id='results' data={this.state}></Results>}
        <hr className="horizontalline2" />
        <div className='feedback'>
          <div id='failed' >SORRY YOU DIDN'T GET IT</div>
          <div id='passed' >CONGRATS! YOU GOT IT</div>
        </div>

      </div>
    );
  }
}




export default Guesser;
