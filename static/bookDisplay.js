

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
      var total = 0;
      for(let i = 0; i < averages.length; i++){
        var props = ['anger','disgust','fear','joy','sadness'];
        for(let j = 0; j < props.length; j++){
          total += averages[i][props[j]]
        }
        for(let j = 0; j < props.length; j++){
          averages[i][props[j]] = (averages[i][props[j]] / total * 100).toString()+' %';
        }
      }
      populateList(sentences);
      $("#anger").html(window.averages[window.currentIndex].anger);
      $("#disgust").html(window.averages[window.currentIndex].disgust);
      $("#fear").html(window.averages[window.currentIndex].fear);
      $("#joy").html(window.averages[window.currentIndex].joy);
      $("#sadness").html(window.averages[window.currentIndex].sadness);
      $("#spotiflier").attr('src', ("https://embed.spotify.com/?uri=spotify%3Atrack%3A" + data.url));
      setTimeout(function() {var l = $('button.play-button#play-button');
      l.click();}, 1000);
    }
  });
}
$(function() {
   $(window).keypress(function(e) {
       var key = e.which;
       if (key == 107) {
         var l = $('button.play-button#play-button');
         l.click();
         console.log("Playing");
       }
   });
});


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
    console.log("Left Click");
    callServer();
    console.log("Server called");
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

        console.log(data);
        $("#spotiflier").attr('src', ("https://embed.spotify.com/?uri=spotify%3Atrack%3A" + data.url));
        setTimeout(function() {var l = $('#body > div.page > header > div.wrapper > div.entity.full-width > div.entity-info.media > div.media-img > button');
        l.click();}, 200);
      }
    });


  });

  $("#right").click(function(){


    console.log("Right Click");
    callServer();
    console.log("Server called");
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
