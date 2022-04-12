var express = require('express');
var app = express();

const fs = require('fs')

const path = '.cache'

try {
  fs.unlinkSync(path)
  //file removed
} catch(err) {
  console.error(err)
}

app.listen(3002, function() {
    console.log('server running on port 3002');
} )

app.get('/', callName);
  
function callName(req, res) {
      
    // Use child_process.spawn method from 
    // child_process module and assign it
    // to variable spawn
    var spawn = require("child_process").spawn;
      
    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    var process = spawn('python',["./toptracks.py"] );
  
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )
}