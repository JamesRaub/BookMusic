

function populateList(combinedSentences){
  // var combinedSentences =
  window.combinedSentences = combinedSentences;
  window.currentIndex = 0;
  $("#content").html(combinedSentences[0]);

}

function callServer(url){
  var formData = new FormData();
  formData.append('sampleFile', $("input[type=file]")[0].files[0]);
  $.ajax({
    method: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    url: '/subscribe',
    success: function(data){
      window.data = data;
      var data = JSON.parse(data);
      console.log("The Beatles are Awesome/n/n/n/n/n");

      console.log(data);        // awfj;jljl;al;j;iaij;jas;ioj;fw;joioin;wefKFJJSADFJLKFSJFSJKLSDLKJFDL
      var sentences = data.sentences;
      var averages = data.averages;
      window.averages = averages;
      populateList(sentences);
      $("#anger").html(window.averages[window.currentIndex].anger);
      $("#disgust").html(window.averages[window.currentIndex].disgust);
      $("#fear").html(window.averages[window.currentIndex].fear);
      $("#joy").html(window.averages[window.currentIndex].joy);
      $("#sadness").html(window.averages[window.currentIndex].sadness);
      $("#spotiflier").attr('src', ("https://embed.spotify.com/?uri=spotify%3Atrack%3A" + data.url));
      setTimeout(function() {var l = $('#body > div.page > header > div.wrapper > div.entity.full-width > div.entity-info.media > div.media-img > button');
      l.click();}, 200);
    }
  });
}

$(document).ready(function(){
  $("#send").click( function(event){
    // alert();
    event.preventDefault();
    var url = $("#txt_name").val();
  //  console.log("Url: "+url);
    callServer(url);
    // populateList()


  });

  /*$('body').keyDown( function(event){
    // alert();
    event.preventDefault();
    var url = $("#txt_name").val();
    console.log("Url: "+url);
    callServer(url);
    // populateList()


  });*/



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

  /*$('body').keydown(function(e) {
    console.log("Something was pressed");
    if (e.key == "ArrowRight") {
      console.log("right click");
    }

    if (e.key == "ArrowLeft") {
      console.log("left click");
    }
  });*/







});
