var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var request = require('request-promise');

var tone_analyzer = new ToneAnalyzerV3({
  username: '807c7cd6-b82d-465c-9902-b26ccca4e10a',
  password: 'APXauglyYOlO',
  version_date: '2016-05-19'
});


var url="https://ia801405.us.archive.org/18/items/alicesadventures19033gut/19033.txt";
request(url)
.then(function (text) {

  //var split = text.match(/(.{1,2000})/g);
  //console.log(split[40]);
  tone_analyzer.tone({ text: text },
    function(err, tone) {
      if (err)
        console.log(err);
      else
         //console.log(text);
        var tones = JSON.stringify(tone, null, 2);

        //used for testing
        console.log(JSON.stringify(tone, null, 2));

  });
})
// fs.readFileSync(url).toString();
