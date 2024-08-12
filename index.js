// index.js
// where your node app starts
require('dotenv').config()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:data",function(req,res){
  let data = req.params.data
  try{
    let date = ""
    if (data.length <= 10){
      date = new Date(data)
      res.json({
        "unix":date.getTime(),
        "utc":date.toUTCString()
      })
    }
    else{
      date = new Date(Number(data))
      res.json({
        "unix":date.getTime(),
        "utc":date.toUTCString()
      })
    }
  }catch(e){

    res.status(404).json({"error":"failed!"})
  }
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
