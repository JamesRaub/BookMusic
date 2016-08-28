

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        changeText(-1) //left <- show Prev image
    } else if (e.keyCode == '39') {
        // right -> show next image
        changeText()
    }
}

function populateList(combinedSentences){
  // var combinedSentences =
  window.combinedSentences = combinedSentences;
  window.currentIndex = 0;
  $("#content").html(combinedSentences[0]);

}

function callServer(url){
  var formData = new FormData();
  formData.append('sampleFile', $("#file")[0].files[0]);
  $.ajax({
    method: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    url: '/subscribe',
    success: function(data){
      window.data = data;
      var data = JSON.parse(data);
      var sentences = data.sentences;
      var averages = data.averages;
      window.averages = averages;
      populateList(sentences);
      $("#anger").html(window.averages[window.currentIndex].anger);
      $("#disgust").html(window.averages[window.currentIndex].disgust);
      $("#fear").html(window.averages[window.currentIndex].fear);
      $("#joy").html(window.averages[window.currentIndex].joy);
      $("#sadness").html(window.averages[window.currentIndex].sadness);
    }
  });
}
$(document).ready(function(){
  $("#send").click( function(event){
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
    $("#anger").html(window.averages[window.currentIndex].anger);
    $("#disgust").html(window.averages[window.currentIndex].disgust);
    $("#fear").html(window.averages[window.currentIndex].fear);
    $("#joy").html(window.averages[window.currentIndex].joy);
    $("#sadness").html(window.averages[window.currentIndex].sadness);

  });

  $("#right").click(function(){
    var newIndex = 0;
    newIndex = (window.currentIndex + 1) % ( window.combinedSentences.length);
    window.currentIndex = newIndex;
    $("#content").html(combinedSentences[window.currentIndex]);
    $("#anger").html(window.averages[window.currentIndex].anger);
    $("#disgust").html(window.averages[window.currentIndex].disgust);
    $("#fear").html(window.averages[window.currentIndex].fear);
    $("#joy").html(window.averages[window.currentIndex].joy);
    $("#sadness").html(window.averages[window.currentIndex].sadness);

  });
});
