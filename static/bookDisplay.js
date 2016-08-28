
function changeText(dir) {
    var startSetence=0;
    var endSetence=0;
    var increment=20;


}

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        changeText(-1) //left <- show Prev image
    } else if (e.keyCode == '39') {
        // right -> show next image
        changeText()
    }
}

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

function populateList(sentences){
  var combinedSentences = splitInChunks(sentences, 20);
  window.combinedSentences = combinedSentences;
  window.currentIndex = 0;
  $("#content").html(combinedSentences[0]);
}

function callServer(url){
  $.ajax({
    url: '/subscribe?name='+url,
    success: function(data){
      window.data = data;
      var sentences = JSON.parse(data);
      populateList(sentences);
    }
  });
}
$(document).ready(function(){
  $("#subscribe_frm").click( function(event){
    // alert();
    event.preventDefault();
    var url = $("#txt_name").val();
    console.log("Url: "+url);
    callServer(url);
    // populateList()
  });

  $("#left").click(function(){
    var newIndex = window.currentIndex - 1;
    if(newIndex < 0)
      newIndex = window.combinedSentences.length -1;
    window.currentIndex = newIndex;
    $("#content").html(combinedSentences[window.currentIndex]);
  });

  $("#right").click(function(){
    var newIndex = 0;
    newIndex = (window.currentIndex + 1) % ( window.combinedSentences.length);
    window.currentIndex = newIndex;
    $("#content").html(combinedSentences[window.currentIndex]);
  });
});
