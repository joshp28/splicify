var express = require('express');
var app = express();
const open = require('open');

const fs = require('fs')

const path = '.cache'

try {
  fs.unlinkSync(path)
  //file removed
} catch(err) {
  console.error(err)
}

try {
  fs.unlinkSync('src/spotify_info.json')
  //file removed
} catch(err) {
  console.error(err)
}

open('http://localhost:3002');

app.listen(3002, function() {
    console.log('server running on port http://localhost:3002');
} )

app.get('/', callName);
  
function callName(req, res) {
    var spawn = require("child_process").spawn;
      
    var process = spawn('python',["./toptracks.py"] );

    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )
}