import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Guesser.css';
import cover from '../../images/boypablo-feelinglonely.jpg';


class Guesser extends Component {

  componentDidMount() {
    this.cropImg();
  }

  state = {
    tries: 0,
    correct: 0,
    answers: [],
    spotify: [{
      "song_title": "Getcho Mans",
      "song_artist": "Rich Brian", // Warren Hue;",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2732bb23b6519784ea65df29a8b"
    },
    {
      "song_title": "edamame",
      "song_artist": "bbno$", //; Rich Brian;",
      "image_url": "https://i.scdn.co/image/ab67616d0000b273545a202ab06885cf2c6621ca"
    },
    {
      "song_title": "damn Right",
      "song_artist": "AUDREY NUNA",
      "image_url": "https://i.scdn.co/image/ab67616d0000b27368db4b081db9b8a63483e052"
    },
    {
      "song_title": "SOMEBODY",
      "song_artist": "keshi",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2739922f27cab942f36da3f909e"
    },
    {
      "song_title": "Lovers In The Night",
      "song_artist": "Seori",
      "image_url": "https://i.scdn.co/image/ab67616d0000b273f40a36b5fd31d9817c34b070"
    }],
    albumNum: 0
  };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { answers, input, spotify, albumNum, tries, correct } = this.state;

    // guess three times and activate hints on each wrong submission
    // guess it right
    if (input != null && input.toLowerCase() === spotify[albumNum].song_title.toLowerCase()) {
      answers.push("Correct");
      this.setState({ albumNum: this.state.albumNum + 1, tries: 0, correct: correct + 1 });


    }
    // guess it wrong
    else if (tries == 2) {
      answers.push("Incorrect");
      this.setState({ albumNum: this.state.albumNum + 1, tries: 0 });
    }
    // guess wrong but have more submissions
    else {
      this.setState({ input: null, tries: tries + 1 });

    }

    //console.log(this.state);

  };


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

  cropImg() {
    let { spotify } = this.state;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    var image1 = new Image();
    image1.src = spotify[0].image_url;
    image1.onload = function () {
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);
    }

    var image2 = new Image();
    image2.src = spotify[1].image_url;
    image2.onload = function () {
      ctx.drawImage(image2, (image2.width / 2) - 50, 0, 100, 500, 60, 0, 60, 300);
    }

    var image3 = new Image();
    image3.src = spotify[2].image_url;
    image3.onload = function () {
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
    }

    var image4 = new Image();
    image4.src = spotify[3].image_url;
    image4.onload = function () {
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    var image5 = new Image();
    image5.src = spotify[4].image_url;
    image5.onload = function () {
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    }
  }


  render() {
    return (
      <div className="Home" >
      <div class='vl'/>
        <h1 className='scoreheader'>SCORE: {this.state.correct}/5</h1>
        <h1>{"SPLICIFY"}</h1>
        <div class="block">
          <hr />
        </div>
        <h2>DO YOU KNOW WHAT SONG SPLICE {this.state.albumNum + 1} IS?</h2>
        <canvas className="canvas" ref='canvas' id="canvas" width={300} height={300}></canvas>
        <div>
          <div className='textbox'>
            <input autoComplete="off" type="text" id="input" onChange={this.saveInput} />
            <button onClick={() => { this.addNewItem(); document.getElementById('input').value = ''; }}> Submit </button>
          </div>
        </div>
        <hr className="horizontalline2"/>
        <div className='didnotgetit'>SORR YOU DIDN'T GET IT ...</div>
        <div className='congrats'>CONGRATS! YOU GOT IT ...</div>

      </div>
    );
  }
}




export default Guesser;
