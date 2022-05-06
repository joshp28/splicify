// import React, { Component } from 'react';
import React, { Component, useState } from "react";
import './Guesser.css';
import cover from '../../images/boypablo-feelinglonely.jpg';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";

import Results from '../Results/Results.js';

import loaded from "../../spotify_info.json";

import mute from '../../images/mute_play.svg';
import close from '../../images/closeModalBtn.svg';
import audioBtn from '../../images/Audio.svg';
import infoBtn from '../../images/infoBtn.svg';
import { Link } from 'react-router-dom';
import { stepIconClasses } from "@mui/material";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import Modal from '../Modal/Modal.js';



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
var resultsFlag;

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



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
    hints: 0,
    show: false
  };
  
  componentDidMount() {
    this.cropImg();
    document.getElementById('failed').style.display = 'none'
    document.getElementById('passed').style.display = 'none'
    document.getElementById('guesser').style.display = ''
    document.getElementById('next').style.display = 'none'
    document.getElementById('songHint').style.display = 'none';
    document.getElementById('albumHint').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    document.getElementById('getResults').style.display = 'none';
    document.getElementById('guesses').style.display = 'none';
    return;
  }  

  playPause = () => {
    // Get state of song    
    let play = this.state.isPlaying;
    // console.log(play);
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
    
  saveInput = (e) => {
    this.setState({ input: e.target.value });
    return;
  };

  addNewItem = () => {
    let { answers, input, loaded, audio, isPlaying, albumNum, tries, correct } = this.state;
    // console.log("ADDNEWITEM");
    //this.cropImg();

    // guess three times and activate hints on each wrong submission
    // guess it right
    if (input != null && input.toLowerCase() === mydata.songs[albumNum].song_artist.toLowerCase()) {
    // if (input != null && input.toLowerCase() === this.getArtists().toLowerCase()) {
      
      answers.push("Correct");
      // console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      // console.log(input);
      this.setState({ correct: correct + 1 });
      document.getElementById('passed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('guesses').style.display = 'none';
      // console.log(spotify[albumNum].song_title);getArtists
    }
    else if (autoInput != null && autoInput.toLowerCase() === mydata.songs[albumNum].song_artist.toLowerCase()) {
      answers.push("Correct");
      // console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      // console.log(answers);
      this.setState({ correct: correct + 1 });
      document.getElementById('passed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('guesses').style.display = 'none';
      var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'HINT: SONG';
      document.getElementById('hintButton').style.display = 'none';
    }
    // guess it wrong
    else if (tries == 2) {
      answers.push("Incorrect");
      // console.log(mydata.songs[albumNum].song_artist.toLowerCase());
      document.getElementById('failed').style.display = '';
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('songHint').style.display = 'none';
      document.getElementById('albumHint').style.display = 'none';
      document.getElementById('guesses').style.display = 'none';
      var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'HINT: SONG';
      document.getElementById('hintButton').style.display = 'none';
    }
    // guess wrong but have more submissions
    else {
      this.setState({ input: null, tries: tries + 1 });
      document.getElementById('hintButton').style.display = '';
      document.getElementById('guesses').style.display = '';
      // console.log(mydata.songs[albumNum].song_artist.toLowerCase());

    }

    if (this.state.answers.length === 5) {
     
      document.getElementById('guesser').style.display = 'none';
      document.getElementById('next').style.display = 'none';
      document.getElementById('getResults').style.display = '';
      document.getElementById('guesses').style.display = 'none';
      document.getElementById('hintButton').style.display = 'none';
    }

    return;
  };

  getArtists = () => {
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
      
      // console.log(artists);

    }
    return artists.toUpperCase();
  }

  parseGetArtists = (songTitle) => {
    let artsitArray = mydata.songs[this.state.albumNum].song_artist;
    let artistLength = mydata.songs[this.state.albumNum].song_artist.length;
    console.log("PARSING ARTSIT");
    return artsitArray.toUpperCase();
  }

  getSongName = () => {
    return mydata.songs[this.state.albumNum].song_title.toUpperCase();
  }

  getAlbumName = () => {
    return mydata.songs[this.state.albumNum].album_name.toUpperCase();
  }

  getHint = () => {
    if (this.state.hints == 0) {
      document.getElementById('songHint').style.display = '';
      document.getElementById('hintButton').style.display = 'none';
      var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'HINT: ALBUM';
      this.setState({ hints: 1 });
    }
    else {
      var button = document.getElementById('hintButton');
      button.innerText = button.textContent = 'HINT: SONG';
      document.getElementById('albumHint').style.display = '';
      document.getElementById('hintButton').style.display = 'none';
      
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
    document.getElementById('songHint').style.display = 'none';
    document.getElementById('albumHint').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    var button = document.getElementById('hintButton');
    button.innerText = button.textContent = 'Hint 1';
    this.cropImg();
    
    
    return;
  }
  
  getResults = () => {
    resultsFlag = true;
    this.setImageResults();
    this.state.audio.pause();
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

  handleInfo() {
    console.log("INFO!");
    
    
     
  }

  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
    console.log("MODAL");
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {   
    
    
    

    return (
      
      <div className="Home" >
        
        <div id='vl' />
        <h1 className='scoreheader'>SCORE: {this.state.correct}/5</h1>
        {/* <h1 id="spliceHome" component={Link} to="/">{"SPLICIFY"}</h1> */}
        <h1 id="spliceHome" component={Link} to="/">
          <Link to="/" id="spliceHomeLink">SPLICIFY</Link>
        </h1>
        <Button id='infoBtn' onClick={() => { this.showModal() }}>
          <img src = {infoBtn} id = "info"/>
        </Button>
        <hr className="block" />


        <div id='guesserblock'>
          <div id='leftblock'>
            <Button id='playBtn' onClick={() => { this.playPause();}}>
              <img src = {mute} id = "mute"/>
            </Button>
            <canvas className="canvas" ref='canvas' id="canvas" width={300} height={300}></canvas>

          </div>

          <div id='rightblock'>
            <h2>DO YOU KNOW THE ARTIST OF SPLICE {this.state.albumNum + 1}?</h2>
            <h2 id='songHint'>SONG: {this.getSongName()}</h2>
            <h2 id='albumHint'>ALBUM: {this.getAlbumName()}</h2>
            <div className='textbox' id='guesser' >
              {/* <input autoComplete="off" type="text" id="input" onChange={this.saveInput} /> */}
              <Button id='hintButton' onClick={() => { this.getHint() }}>
                HINT: SONG
              </Button>

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
            </div>
            <br />
            <Button variant="contained" id='next' onClick={() => { this.nextAlbum() }}>
              Next
            </Button>

            <Button variant="contained" id='getResults' onClick={() => { this.getResults() }}>
              Results
            </Button>

          </div>
          
          
          {/* <Modal
            open={open}
            onClose={this.handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Share this with friends!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Lorem ipsum...
              </Typography>
            </Box>
          </Modal> */}
          
          
          {/* <button onClick={() => { this.nextAlbum() }} id='next'> Next </button> */}
        </div>
        {this.state.results && <Results id='results' data={this.state}></Results>}
        <hr className="horizontalline2" />
        <div className='feedback'>
          <div id='failed' >SORRY, YOU DIDN'T GET IT</div>
          <div id='guesses' >NICE TRY, GUESSES LEFT: {3 - this.state.tries}</div>
          <div id='passed' >CONGRATS, YOU GOT IT</div>
          <Modal 
          show={this.state.show} 
          handleClose={this.hideModal} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          {/* <p>Modal</p> */}

          <Box id="boxModal" sx={style}>
            <Button id='playBtn' onClick={() => { this.hideModal()}}>
              <img src = {close} id = "close"/>
            </Button>
            <Typography id="modal-modal-title" variant="h1" component="h6">
            SPLICIFY
            </Typography>
            {/* <br></br> */}

            <Typography id="modal-modal-description1" sx={{ mt: 2 }}>
            Splicify is an interactive experience where you can guess the artists of your 
            top 5 songs. Log in to your Spotify account and we will create an image that 
            contains slices of album covers. You have 3 guesses to correctly answer the 
            artist name. There are three hints available, the song, song name, and album 
            name. Splicify is a project for the Creative Computing Studio course at Virginia Tech.


            </Typography>

            <Typography id="modal-modal-description2" sx={{ mt: 2}}>
            Created by: 
            
            </Typography>

            <Typography id="modal-modal-description3" sx={{ mt: 2}}>
              Tyler Esposo, Catherine Lee, Josh Protacio, Lily Thai
            </Typography>
            

            
          </Box>

        </Modal>
        </div>

        

      </div>
    );
  }
}




export default Guesser;
