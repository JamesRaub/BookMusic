"use strict";


var express = require("express");
var _ = require('lodash');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var request = require('request-promise');
var fileUpload = require('express-fileupload');
var fs = require('fs')
var tone_analyzer = new ToneAnalyzerV3({
  username: '807c7cd6-b82d-465c-9902-b26ccca4e10a',
  password: 'APXauglyYOlO',
  version_date: '2016-05-19'
});

var app = express();


// default options
app.use(fileUpload());

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function splitInChunks(arr, chunk_size){
  // var chunk_size = 10;
  // var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  var groups = arr.map( function(e,i){
      return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null;
  })
  .filter(function(e){ return e; });
  for(var i = 0; i  < groups.length; i++){
    groups[i] = groups[i].join("");
  }
  return groups;
}

function splitInChunksNotJoin(arr, chunk_size){
  // var chunk_size = 10;
  // var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  var groups = arr.map( function(e,i){
      return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null;
  })
  .filter(function(e){ return e; });
  for(var i = 0; i  < groups.length; i++){
    groups[i] = groups[i]
  }
  return groups;
}
function calculateEmotionsAverage(emotionArray){
  var averages =  {
    'anger': 0,
    'disgust': 0,
    'fear': 0,
    'joy': 0,
    'sadness': 0
  }
  var emotions = Object.keys(averages);
  console.log(emotions);
  for(var i = 0; i < emotionArray.length; i++){

    for(var j = 0; j < emotionArray[i].length; j++){
      // console.log(emotionArray[i][j]);
      averages[emotionArray[i][j].tone_id] += emotionArray[i][j].score;
      // console.log(emotionArray[i][j].score)
    }
  }
  averages['anger'] = averages['anger'] / emotionArray.length;
  averages['disgust'] = averages['disgust'] / emotionArray.length;
  averages['fear'] = averages['fear'] / emotionArray.length;
  averages['joy'] = averages['joy'] / emotionArray.length;
  averages['sadness'] = averages['sadness'] / emotionArray.length;
  console.log(averages);
//   console.log(averages);
  return averages;
}
// splitInChunks(sentences, 20);
function obtainSentencesFromTone(tone){
  var sentences = [];
  // console.log(tone.sentences_tone[10].tone_categories);
  var emotional_tones = []
  console.log(tone.sentences_tone.length)
  for(var i = 0; i < tone.sentences_tone.length; i ++){
    var tmp = tone.sentences_tone[i].text;

    tmp = tmp.replaceAll("\r"," ").replaceAll("\n"," ").replaceAll('\"',' ').replaceAll("[",' ').replaceAll(']'," ");
    sentences.push(tmp);
    var tmp_tone = tone.sentences_tone[i].tone_categories[0];
    if(tmp_tone){
      console.log(tmp_tone);
      // console.log(tmp_tone.tones);
      emotional_tones.push(tmp_tone.tones);
    } else {
      emotional_tones.push([ { score: 0, tone_id: 'anger', tone_name: 'Anger' },
  { score: 0, tone_id: 'disgust', tone_name: 'Disgust' },
  { score: 0, tone_id: 'fear', tone_name: 'Fear' },
  { score: 0, tone_id: 'joy', tone_name: 'Joy' },
  { score: 0, tone_id: 'sadness', tone_name: 'Sadness' } ]);
    }
  }

  // console.log(emotional_tones);
  var newSentences = splitInChunks(sentences, 20);
  var newEmotions = splitInChunksNotJoin(emotional_tones, 20);
  // console.log(newEmotions);
  var averages = newEmotions.map(function(element){
    return calculateEmotionsAverage(element);
  });
  console.log(averages);
  return { sentences: newSentences, averages: averages };
}


function readText(req, res, text) { // req, res, url){
  // request({ uri: url })
  // .then(function (text) {
    tone_analyzer.tone({ text: text },
      function(err, tone) {
        if (err) {
          console.log(err);
          res.send("Error");
        }
        else {
          // console.log(tone);
          var data = obtainSentencesFromTone(tone);
          // console.log(data.emotional_tones);
          //used for testing
          //image scrolling
          var result = JSON.stringify(data, null, 2);
          //console.log(result);
          res.send(result);
       }//else
    });
  // });
}

app.post('/subscribe', function(req, res) {
  // var url = req.query['name'];
  // if(url){
  //   readText(req, res, url);
  // } else {
  //
  // }
  if (!req.files) {
      res.send('No files were uploaded.');
      return;
  }
  console.log(req.files);
  var sampleFile = req.files.sampleFile;
  sampleFile.mv('random.txt', function(err) {
      if (err) {
          res.status(500).send(err);
      }
      else {
          //
          fs.readFile('random.txt', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            readText(req, res, data);
          });
          // res.send('File uploaded!');
      }
  });

});


// app.get("/", function(req, res){
//   res.send("Welcome!")
// })

app.use(express.static('../view'));

app.use('/static', express.static('../static'));


app.listen("3000", function(){
  console.log("Listening on port 3000")
});
// app.post();



// var url="https://ia801405.us.archive.org/18/items/alicesadventures19033gut/19033.txt";

// fs.readFileSync(url).toString();
