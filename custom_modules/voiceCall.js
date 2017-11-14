$("#voice_call").click(function(e) {
  e.preventDefault();
  console.log("inside voice call");
  if (call != null) {
    call.close();
  }
  if (window.localStream != null && window.localStream.getAudioTracks().length > 0) {
    console.log("Calling the receiver");
    $("#voice_call").hide();
    $("#cancel_call").show();
    if (window.localStream.getVideoTracks().length > 0) {
      window.localStream.getVideoTracks()[0].enabled = false;
    }
    call = peer.call(connection.peer, window.localStream, {metadata: 'voice'});
    call.on('stream', function(stream) {
      window.remoteStream = stream;
      $("#cancel_call").hide();
      $('audio').prop('src', URL.createObjectURL(stream));
      $("#end_call").show();
    });
    call.on('close', function() {
      $("#end_call").hide();
      $("#voice_call").show();
      $("#cancel_call").hide();
    });
  } else {
    console.log("Coming here in get mic");
    get_mic();
    if (my_prompt != null) {
      my_prompt.close();
    }
    // my_prompt = new Impromptu("Your browser is asking you to activate your microphone. The popup should be somewhere on the top or bottom of your screen", {
    //   title: "Activate Your Microphone and try again.",
    //   buttons: {
    //     "OK": true
    //   }
    // });
    $("#setPromptHeader").text("Microphone inactive");
    $("#setPromptContent").html("<p>Your browser is asking you to activate your microphone.Please activate your microphone and try again.</p>");
    $('.ui.prompt.modal').modal({
      closable: false,
      onApprove: function() {
        console.log("Approved");
      }
    }).modal('show');
  }
});

function get_mic() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({
    audio: true,
    video: false
  }, function(stream) {
    window.localStream = stream;
    //$("#stat_my_mic").text("Active");
    stat_my_mic = "active";
    sendStatus();
    // updateMyStatus();
  }, function() {
    console.log("Microphone not granted");
  });
}

function sendStatus() {
  //if(conn != null && conn.open == true){
  send('{"stat_mic":"' + stat_my_mic + '","stat_video":"' + stat_my_video + '","stat_size":"' + stat_my_size + '"}');
  //}
}

function updateMyStatus() {
  $("#stat_my_id").text(stat_my_id);
  $("#stat_my_mic").text(stat_my_mic);
  $("#stat_my_video").text(stat_my_video);
  $("#stat_my_size").text(stat_my_size);
}

function updatePartnerStatus() {
  $("#stat_partner_id").text(stat_partner_id);
  $("#stat_partner_mic").text(stat_partner_mic);
  $("#stat_partner_video").text(stat_partner_video);
  $("#stat_partner_size").text(stat_partner_size);
}

$("#end_call").click(function(e) {
  e.preventDefault();
  if (call) {
    call.close();
  }
  send('{"call_status": "hang_up"}');
});
$("#cancel_call").click(function(e) {
  e.preventDefault();
  $("#cancel_call").hide();
  $("#voice_call").show();
  send('{"call_status": "hang_up"}');
});
