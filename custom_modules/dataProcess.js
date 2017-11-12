function receivingDataProcess(data) {

    var message_json = jQuery.parseJSON(data);

    log(message_json);

    if(message_json[0] == "Point"){
			var a_new_point = {x: message_json[1], y: message_json[2]};
			new_point(a_new_point);
		}
    else if(message_json.new_line == "true"){
			    			new_line();
			    		}
    else if (message_json.typing == "true") {
        is_typing();
    }

		else if(message_json.clear == "true"){
			clearIt();
		}

		else if(message_json[0] == 'Path'){
			my_draw(message_json);
		}
    else if(message_json.textMessage == "true"){
        var received_message = strip(decodeURIComponent(message_json.message));

        var d= new Date();
        var msg_time = d.toLocaleTimeString();
        var new_message;

        //
        if(previous_sender!="partner"){
             new_message = '<div class="shout_msg"><time>'+msg_time+'</time><span class="username">Partner</span><span class="message">'+received_message+'</span></div>';
             previous_sender = "partner";
        }
        else{
            new_message = '<div class="shout_msg"><time>'+msg_time+'</time><span class="message">'+received_message+'</span></div>';
        }
        //append data into messagebox with jQuery fade effect!
        $(new_message).linkify().hide().appendTo('.message_box').fadeIn();

        //keep scrolled to bottom of chat!

        /////////////////////////////////////////////////////YOCHAT///////////////
        var scrolltoh = $('.message_box')[0].scrollHeight;
        $('.message_box').scrollTop(scrolltoh);
        console.log(received_message);
        // ion.sound.play("message_drop");
        unread_messages = unread_messages +1;
        not_typing();
        update_badge();
        if(message_json.speak == "true"){
            // TODO BUG/////////////////
            log("Bug");
            responsiveVoice.speak(received_message);
        }
    }
}



function is_typing(){
    clearTimeout(typing_timeout);

    $("#typing_msg").show();
    typing_timeout = setTimeout(function(){
        $("#typing_msg").hide();
    }, 10000);
}
function not_typing(){
    clearTimeout(typing_timeout);
    $("#typing_msg").hide();
}

function log(data){
    console.log(data);
}
