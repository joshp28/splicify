import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import './Results.css';
import loaded from "../../spotify_info.json";


var data = loaded;
var mydata = JSON.parse(data);

class Results extends Component {

  componentDidMount() {
    this.cropImg();
    console.log(this.state);
  };

  state = {
    tries: 0,
    answers: ["Correct", "Correct", "Correct", "Correct", "Correct"],
    loaded,
    albumNum: 0
  };

  
  cropImg() {
    // let { loaded } = this.state;
    const canvas = document.getElementById('canvasResults');
    const ctx = canvas.getContext('2d');


    var image1 = new Image();
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 60, 300);
    }

    var image2 = new Image();
    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      ctx.drawImage(image2, (image2.width / 2) - 50, 0, 100, 500, 60, 0, 60, 300);
    }

    var image3 = new Image();
    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 120, 0, 60, 300);
    }

    var image4 = new Image();
    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 180, 0, 60, 300);
    }

    var image5 = new Image();
    image5.src = mydata.songs[4].image_url;
    image5.onload = function () {
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 240, 0, 60, 300);
    }
  }


  render() {
    return (
      

      <div className="Home" >
        <div className='vl' />
        <h1 className='scoreheader'>SCORE: {this.state.correct}/5</h1>
        <h1>{"SPLICIFY"}</h1>
        <hr className="block" />
        <div>
        <canvas className="canvasResults" ref='canvasResults' id="canvasResults" width={500} height={500}></canvas>
        <div className="answers">
          <h2>{mydata.songs[0].song_title}: {this.state.answers[0]}</h2>
          <h2>{mydata.songs[1].song_title}: {this.state.answers[1]}</h2>
          <h2>{mydata.songs[2].song_title}: {this.state.answers[2]}</h2>
          <h2>{mydata.songs[3].song_title}: {this.state.answers[3]}</h2>
          <h2>{mydata.songs[4].song_title}: {this.state.answers[4]}</h2>
        </div>
        </div>
        <hr className="horizontalline2" />

      </div>
    );
  }
}


export default Results;
