$(".header").click(function (e) {
				//get CSS display state of .toggle_chat element
				var toggleState = $('.toggle_chat').css('display');

				//toggle show/hide chat box
				$('.toggle_chat').slideToggle();

				//use toggleState var to change close/open icon image
				if(toggleState == 'block')
				{
					$(".header div").attr('class', 'open_btn');

				}else{
					$(".header div").attr('class', 'close_btn');
					$("#shout_message").focus();
				}
				var scrolltoh = $('.message_box')[0].scrollHeight;
				$('.message_box').scrollTop(scrolltoh);
				unread_messages = 0;
				//update_badge();
        isThisWorking();
        test();
			});
			$("#shout_message").keyup(function(evt) {
				if(evt.which == 13) {
					var iusername = $('#shout_username').val();

					var imessage = strip($('#shout_message').val());

					var to_send;
					if(evt.shiftKey == true){
						to_send = {textMessage:"true", name:encodeURIComponent(iusername), message:encodeURIComponent(imessage),speak:"true"};
						//console.log("shift");
					}
					else{
						to_send = {textMessage:"true", name:encodeURIComponent(iusername), message:encodeURIComponent(imessage), speak:"false"};
					}
					console.log(to_send);
					var to_send = JSON.stringify(to_send);
					console.log(to_send);
					$('.alert_shout_msg').remove();
					var d= new Date();
					var msg_time = d.toLocaleTimeString();
					if(conn != null && conn.open == true){
						if(imessage.length > 0){
							my_send(to_send);
							last_typed_time = 0;
							//imessage = imessage.replace(regex, "<a href='$1' target='_blank'>$1</a>");
							var data;
							if(previous_sender != "me"){
							 data = '<div class="shout_msg me_shout_msg"><time>'+msg_time+'</time><span class="username my_username">You</span><span class="message">'+imessage+'</span></div>';
							 	previous_sender = "me";
							}
							else{
								data = '<div class="shout_msg me_shout_msg"><time>'+msg_time+'</time><span class="message">'+imessage+'</span></div>';
							}
							//append data into messagebox with jQuery fade effect!
							$(data).linkify().hide().appendTo('.message_box').fadeIn();

							//keep scrolled to bottom of chat!
							var scrolltoh = $('.message_box')[0].scrollHeight;
							$('.message_box').scrollTop(scrolltoh);

							//reset value of message box
							$('#shout_message').val('');
						}
					}
					else{
						//$('.alert_shout_msg').remove();
						var data = '<div class="shout_msg alert_shout_msg"><time>'+msg_time+'</time><span class="username alert_msg">Alert</span><span class="message alert_msg">You are not connected</span></div>';
						//append data into messagebox with jQuery fade effect!
						$(data).hide().appendTo('.message_box').fadeIn();

						//keep scrolled to bottom of chat!
						var scrolltoh = $('.message_box')[0].scrollHeight;
						$('.message_box').scrollTop(scrolltoh);
					}
				}
				else{
					if(((window.performance.now() - last_typed_time) > 5000) && (evt.which != 16)){
						my_send('{"typing":"true"}');
						last_typed_time = window.performance.now();
					}
				}
			});
