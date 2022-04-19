import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Guesser.css';
import cover from '../../images/boypablo-feelinglonely.jpg';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Box from '@mui/material/Box';



import Button from '@mui/material/Button';

import loaded from "../../spotify_info.json";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// We can replace with answers
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003}
];

const handlePlay = () => setPlay(true);
    
var audio = new Audio("https://p.scdn.co/mp3-preview/8553a21392d68592e6884a15f28909a499663b1c?cid=1065d1fc90714ae18996972cb4abd133");
function setPlay(){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
}



class Guesser extends Component {
  componentDidMount() {
    this.cropImg();
    
    // console.log(mydata.songs[0].song_artist);
  } 

  state = {
    tries: 0,
    answers: [],
    loaded,
    albumNum: 0
  };

  // state = {
  //   tries: 0,
  //   answers: [],
  //   spotify: [{
  //     "song_title": "Getcho Mans",
  //     "song_artist": "Rich Brian", // Warren Hue;",
  //     "image_url": "https://i.scdn.co/image/ab67616d0000b2732bb23b6519784ea65df29a8b"
  //   },
  //   {
  //     "song_title": "edamame",
  //     "song_artist": "bbno$", //; Rich Brian;",
  //     "image_url": "https://i.scdn.co/image/ab67616d0000b273545a202ab06885cf2c6621ca"
  //   },
  //   {
  //     "song_title": "damn Right",
  //     "song_artist": "AUDREY NUNA",
  //     "image_url": "https://i.scdn.co/image/ab67616d0000b27368db4b081db9b8a63483e052"
  //   },
  //   {
  //     "song_title": "SOMEBODY",
  //     "song_artist": "keshi",
  //     "image_url": "https://i.scdn.co/image/ab67616d0000b2739922f27cab942f36da3f909e"
  //   },
  //   {
  //     "song_title": "Lovers In The Night",
  //     "song_artist": "Seori",
  //     "image_url": "https://i.scdn.co/image/ab67616d0000b273f40a36b5fd31d9817c34b070"
  //   }],
  //   albumNum: 0
  // };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { answers, input, loaded, albumNum, tries} = this.state;

    // guess three times and activate hints on each wrong submission
    // guess it right
    if (input != null && input.toLowerCase() === loaded[albumNum].song_title.toLowerCase()) {
      answers.push("True"); 
      this.setState({ albumNum: this.state.albumNum + 1, tries: 0 });

    }
    // guess it wrong
    else if (tries == 2) {
      answers.push("False");
      this.setState({ albumNum: this.state.albumNum + 1, tries: 0 });
    }
    // guess wrong but have more submissions
    else{
      this.setState({ input: null, tries: tries + 1});

    }

    //console.log(this.state);

  };


  cropImg() {
    let { loaded } = this.state;
    var data = loaded;
    var mydata = JSON.parse(data);
    

    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var image1 = new Image();
    console.log("IMGSRC");
    console.log(mydata);
    console.log(mydata.songs);
    console.log();
    image1.src = mydata.songs[0].image_url;
    console.log("IMGSRC");
    image1.onload = function () {
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 100, 500);
    }

    var image2 = new Image();
    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      ctx.drawImage(image2, (image2.width / 2) - 50, 0, 100, 500, 100, 0, 100, 500);
    }

    var image3 = new Image();
    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 200, 0, 100, 500);
    }

    var image4 = new Image();
    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 300, 0, 100, 500);
    }

    var image5 = new Image();
    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 400, 0, 100, 500);
    }
  }

  

  render() {
    
    return (
      <div className="Home-header" >
        <h1>{"Splicify"}</h1>
        <canvas className="canvas" ref='canvas' id="canvas" width={500} height={500}></canvas>
        <div className="textbox">
          <h2>Guess your {this.state.albumNum + 1} album</h2>          
          
          <div className='textbox'>
          <Button onClick={handlePlay}>HINT</Button>

          <Autocomplete
            id="highlights-demo"
            sx={{ width: 600, margin: 'auto'}}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <div id="container">
                <Box
                  sx={{
                    width: '60%',
                    margin: 'auto'
                  }}
                >
                
                  <TextField {...params} sx={{ position: "center", background: "white", input: { color: 'black' } }} id="input" label="Guess your song!" margin="normal" onChange={this.saveInput}/>
                </Box>
              </div>
              
            )}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.title, inputValue);
                const parts = parse(option.title, matches);

                return (                
                <li {...props}>
                    <div>
                    {parts.map((part, index) => (
                        <span
                        key={index}
                        style={{
                            fontWeight: part.highlight ? 700 : 400,
                        }}
                        >
                        {part.text}
                        </span>
                    ))}
                    </div>
                </li>
                );
            }}
        />
            {/* <input autoComplete="off" type="text" id="input" onChange={this.saveInput} /> */}
            <button onClick={() => { this.addNewItem(); document.getElementById('input').value = ''; }}> Submit </button>
            <br/>
            <br/>
          </div>
        </div>


      </div>
    );
  }
}




export default Guesser;
