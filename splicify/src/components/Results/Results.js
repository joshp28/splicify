import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import styles from './Results.module.css';

class Results extends Component {

  componentDidMount() {
    this.cropImg();
    console.log(this.state);
  };

  state = {
    tries: 0,
    answers: ["Correct", "Correct", "Correct", "Correct", "Correct"],
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

  


  cropImg() {
    let { spotify } = this.state;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var image1 = new Image();
    image1.src = spotify[0].image_url;
    image1.onload = function () {
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 100, 500);
    }

    var image2 = new Image();
    image2.src = spotify[1].image_url;
    image2.onload = function () {
      ctx.drawImage(image2, (image2.width / 2) - 50, 0, 100, 500, 100, 0, 100, 500);
    }

    var image3 = new Image();
    image3.src = spotify[2].image_url;
    image3.onload = function () {
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 200, 0, 100, 500);
    }

    var image4 = new Image();
    image4.src = spotify[3].image_url;
    image4.onload = function () {
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 300, 0, 100, 500);
    }

    var image5 = new Image();
    image5.src = spotify[4].image_url;
    image5.onload = function () {
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 400, 0, 100, 500);
    }
  };


  render() {
    return (
      

      <div className="Home" >
        <div className='vl' />
        <h1 className='scoreheader'>SCORE: {this.state.correct}/5</h1>
        <h1>{"SPLICIFY"}</h1>
        <hr className="block" />
        <div>
        <canvas className="canvas" ref='canvas' id="canvas" width={500} height={500}></canvas>
        <div className="answers">
          <h2>{this.state.spotify[0].song_title}: {this.state.answers[0]}</h2>
          <h2>{this.state.spotify[1].song_title}: {this.state.answers[1]}</h2>
          <h2>{this.state.spotify[2].song_title}: {this.state.answers[2]}</h2>
          <h2>{this.state.spotify[3].song_title}: {this.state.answers[3]}</h2>
          <h2>{this.state.spotify[4].song_title}: {this.state.answers[4]}</h2>
        </div>
        </div>
        <hr className="horizontalline2" />

      </div>
    );
  }
}


export default Results;
