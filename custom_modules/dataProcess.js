function receivingDataProcess(data) {

  var message_json = jQuery.parseJSON(data);

  console.log(message_json);

  //Draw part
  if (message_json[0] == "Point") {
    var a_new_point = {
      x: message_json[1],
      y: message_json[2]
    };
    new_point(a_new_point);
  } else if (message_json.new_line == "true") {
    new_line();
  } else if (message_json.clear == "true") {
    clearIt();
  } else if (message_json[0] == 'Path') {
    my_draw(message_json
    );
  }

  //Messaging part
  else if (message_json.typing == "true") {
    is_typing();
  } else if (message_json.textMessage == "true") {
    var received_message = strip(decodeURIComponent(message_json.message));

    var d = new Date();
    var msg_time = d.toLocaleTimeString();
    var new_message;

    //
    if (previous_sender != "partner") {
      new_message = '<div class="shout_msg"><time>' + msg_time + '</time><span class="username">Partner</span><span class="message">' + received_message + '</span></div>';
      previous_sender = "partner";
    } else {
      new_message = '<div class="shout_msg"><time>' + msg_time + '</time><span class="message">' + received_message + '</span></div>';
    }
    //append data into messagebox with jQuery fade effect!
    $(new_message).linkify().hide().appendTo('.message_box').fadeIn();

    //keep scrolled to bottom of chat!

    /////////////////////////////////////////////////////YOCHAT///////////////
    var scrolltoh = $('.message_box')[0].scrollHeight;
    $('.message_box').scrollTop(scrolltoh);
    console.log(received_message);
    // ion.sound.play("message_drop");
    unread_messages = unread_messages + 1;
    not_typing();
    update_badge();
    if (message_json.speak == "true") {
      responsiveVoice.speak(received_message);
    }
  }

  //Call part
  if (message_json.call_status == "hang_up") {
    if (call) {
      call.close();
    }

    $("#cancel_call").hide();
    $("#voice_call").show();

    $("#setPromptHeader").text("Call hung up");
    $("#setPromptContent").html("<p>Try again later!</p>");
    $('.ui.prompt.modal')
    .modal({
      closable  : false,
      onApprove : function() {
        console.log("Approved");
      }
    })
    .modal('show')
    ;
  }
  if (message_json.call_status == "hang_up_video") {
    if (call) {
      call.close();
    }
    $("#cancel_video_call").hide();
    $("#video_call").show();

    $("#setPromptHeader").text("Video call hung up");
    $("#setPromptContent").html("<p>Try again later!</p>");
    $('.ui.prompt.modal')
    .modal({
      closable  : false,
      onApprove : function() {
        console.log("Approved");
      }
    })
    .modal('show')
    ;
  }
  if (message_json.call_status == "mic_inactive") {
    if (call) {
      call.close();
    }
    $("#cancel_call").hide();
    $("#voice_call").show();
    if (my_prompt != null) {
      my_prompt.close();
    }
    // my_prompt = new Impromptu("Your partner's microphone is not activated. Please try again.", {
    //   title: "Partner microphone inactive",
    //   buttons: {
    //     "OK": true
    //   }
    // });

    $("#setPromptHeader").text("Call failed");
    $("#setPromptContent").html("<p>Your partner's microphone is not activated. Please try again.</p>");
    $('.ui.prompt.modal')
    .modal({
      closable  : false,
      onApprove : function() {
        console.log("Approved");
      }
    })
    .modal('show')
    ;
  }
  if (message_json.call_status == "cam_inactive") {
    if (call) {
      call.close();
    }
    $("#cancel_video_call").hide();
    $("#video_call").show();

    $("#setPromptHeader").text("Call failed");
    $("#setPromptContent").html("<p>Your partner's camera is not activated. Please try again.</p>");
    $('.ui.prompt.modal')
    .modal({
      closable  : false,
      onApprove : function() {
        console.log("Approved");
      }
    })
    .modal('show')
    ;
  }

  if (message_json.stat_mic != null) {
    console.log("Coming in state");
    stat_partner_mic = message_json.stat_mic;
    updatePartnerStatus();
  }
  if (message_json.stat_video != null) {
    stat_partner_video = message_json.stat_video;
    updatePartnerStatus();
  }
  if (message_json.stat_size != null) {
    stat_partner_size = message_json.stat_size;
    updatePartnerStatus();
  }



}

function is_typing() {
  clearTimeout(typing_timeout);
  $("#typing_msg").show();
  typing_timeout = setTimeout(function() {
    $("#typing_msg").hide();
  }, 10000);
}
function not_typing() {
  clearTimeout(typing_timeout);
  $("#typing_msg").hide();
}
