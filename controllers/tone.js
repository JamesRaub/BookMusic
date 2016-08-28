"use strict";

var express = require("express");

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var request = require('request-promise');

var tone_analyzer = new ToneAnalyzerV3({
  username: '807c7cd6-b82d-465c-9902-b26ccca4e10a',
  password: 'APXauglyYOlO',
  version_date: '2016-05-19'
});

var app = express();

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

app.get('/subscribe', function(req, res) {
  var url = req.query['name'];

  request(url)
  .then(function (text) {

    var split = text.match(/(.{1,2000})/g);
    console.log(split);

    //console.log(split[40]);
    tone_analyzer.tone({ text: text },
      function(err, tone) {
        if (err) {
          console.log(err);
        }
        else {
           //console.log(text);
          // var tones = JSON.stringify(tone, null, 2);

          var sentences = [];

          for(var i = 0; i < tone.sentences_tone.length; i ++){
            var tmp = tone.sentences_tone[i].text;
            tmp = tmp.replaceAll("\r","").replaceAll("\n","").replaceAll('\"','').replaceAll("[",'').replaceAll(']',"");
            sentences.push(tmp);
          }
          //used for testing
          var result = JSON.stringify(sentences, null, 2);
          console.log(result);
          res.send(result);
       }
    });
  });
});

// app.get("/", function(req, res){
//   res.send("Welcome!")
// })

app.use(express.static('../view'))
app.listen("3000", function(){
  console.log("Listening on port 3000")
});
// app.post();


// var url="https://ia801405.us.archive.org/18/items/alicesadventures19033gut/19033.txt";

// fs.readFileSync(url).toString();
