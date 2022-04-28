import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Results.css';
import Button from '@mui/material/Button';

var data;
var mydata;
var answers



class Results extends Component {

  
  constructor(props) {
    super(props);

    data = this.props.data.loaded;
    answers = this.props.data.answers;
    mydata = JSON.parse(data);
  
  }
  componentDidMount() {
    this.cropImg();

  };

  cropImg() {
    let cssfilter;
    const canvas = document.getElementById('canvasResults');
    const ctx = canvas.getContext('2d');
    var image1 = new Image();
    image1.crossOrigin = "anonymous";
    image1.src = mydata.songs[0].image_url;
    image1.onload = function () {
      cssfilter = "bright(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image1, (image1.width / 2) - 50, 0, 100, 500, 0, 0, 100, 500);
    }

    var image2 = new Image();
    image2.crossOrigin = "anonymous";
    image2.src = mydata.songs[1].image_url;
    image2.onload = function () {
      cssfilter = "bright(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image2, (image2.width / 2) - 50, 10, 100, 500, 100, 0, 100, 500);
    }

    var image3 = new Image();
    image3.crossOrigin = "anonymous";
    image3.src = mydata.songs[2].image_url;
    image3.onload = function () {
      cssfilter = "bright(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image3, (image3.width / 2) - 50, 0, 100, 500, 200, 0, 100, 500);
    }

    var image4 = new Image();
    image4.crossOrigin = "anonymous";
    image4.src = mydata.songs[3].image_url;
    image4.onload = function () {
      cssfilter = "bright(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image4, (image4.width / 2) - 50, 0, 100, 500, 300, 0, 100, 500);
    }

    var image5 = new Image();
    image5.crossOrigin = "anonymous";
    
    image5.onload = function () {
      cssfilter = "bright(1)" 
      ctx.filter = cssfilter;
      ctx.drawImage(image5, (image5.width / 2) - 50, 0, 100, 500, 400, 0, 100, 500);
    }
    image5.src = mydata.songs[4].image_url;
  }


  downloadImage() {   
    canvas.toBlob(function(blob) {
      let URLObj = window.URL || window.webkitURL;
        let a = document.createElement("a");  
        a.href = URLObj.createObjectURL(blob);
        a.download = "Splicify.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
  
  }

  render() {

    return (

      <div id="Home" >

        <canvas className="canvasResults" ref='canvasResults' id="canvasResults" width={500} height={500}></canvas>
        <div id="answers">
          <h2>{mydata.songs[0].song_title}: {answers[0]}</h2>
          <h2>{mydata.songs[1].song_title}: {answers[1]}</h2>
          <h2>{mydata.songs[2].song_title}: {answers[2]}</h2>
          <h2>{mydata.songs[3].song_title}: {answers[3]}</h2>
          <h2>{mydata.songs[4].song_title}: {answers[4]}</h2>
        </div>
        <div className='feedback'>
          <Button style={{
            backgroundColor: "black",
            }}
            variant="contained" id='downloadBtn' onClick={() => { this.downloadImage() }}>
            Download
          </Button>
        </div>
        
      </div>
      
    );
  }
}


export default Results;
