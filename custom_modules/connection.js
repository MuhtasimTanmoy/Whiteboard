let name = "tanmoy" + Math.floor(Math.random() * 1000 % 10);
var connection;

var last_typed_time = 0;
var typing_timeout;
var unread_messages = 0;
var previous_sender = "none";
var window_focus;
var call;
var my_prompt=null;



var stat_my_id="-";
var stat_my_mic="-";
var stat_my_video="-";
var stat_my_size="-";

var stat_partner_id = "-";
var stat_partner_mic = "-";
var stat_partner_video = "-";
var stat_partner_size = "-";




//var peer = new Peer(name, {key: 'a2fqeua8vn78ehfr'});

var peer = new Peer(name, {
  host: 'localhost',
  port: 3000,
  path: '/api'
});

console.log(peer.id + " started.");

$('#myId').html("My id: <h1>" + peer.id + "</h1>");

//////////Connection for client////////////////////

peer.on('connection', function (conn) {

  connection = conn;

  console.log(connection.peer + " Connected");
  receiveData();

  $('div.left.icon').hide();
  $("#disconnect").show();

});


/////////////////Connection for call/////////////////////////////////

peer.on('call', function(call_in){
	      	call = call_in;
	      	console.log("Received call");
	      	console.log(call.metadata);
	      	if(call.metadata == "voice"){
		      	if(window.localStream == null || window.localStream.getAudioTracks().length == 0){
		      		get_mic();
		      		send('{"call_status": "mic_inactive"}');
		      		if(my_prompt != null){
		      			my_prompt.close();
		      		}
		      	// 	my_prompt = new Impromptu("There is an incoming voice call from your partner, but your microphone is not activated. Please activate your microphone.", {
						// title: "Activate your microphone",
						// buttons: { "OK": true}
            //});



            $("#setPromptHeader").text("Incoming call");
            $("#setPromptContent").html("<p>There is an incoming voice call from your partner, but your microphone is not activated. Please activate your microphone.</p>");
            $('.ui.prompt.modal')
            .modal({
              closable  : false,
              onApprove : function() {
                console.log("Approved");
              }
            })
            .modal('show')
            ;
						//timeout: 20000,

		      	}
		      	else{
		      		if(my_prompt != null){
		      			my_prompt.close();
		      		}
		      // 		my_prompt = new Impromptu("There is an incoming voice call from your partner.", {
					// 	title: "Incoming call",
					// 	buttons: { "Answer": true, "Not now": false },
					// 	//timeout: 20000,
					// 	submit: function(e,v,m,f){
					// 		// use e.preventDefault() to prevent closing when needed or return false.
					// 		// e.preventDefault();
					// 		if(v == true){
					// 			if(window.localStream.getAudioTracks().length > 0){
	    		// 					window.localStream.getAudioTracks()[0].enabled = false;
	    		// 				}
					// 	  		call.answer(window.localStream);
					//       		call.on('stream', function(stream){
				  //   				window.remoteStream = stream;
          //
					// 	      		//change_status_button("call_button","green");
					// 	        	$('audio').prop('src', URL.createObjectURL(stream));
          //
					// 	        	$("#end_call").show();
					// 		    	$("#voice_call").hide();
					//   	 		});
				  // 	  			call.on('close', function(){
					// 		      	//change_status_button("call_button","red");
					// 		      	exitFullscreen();
					// 		  	  	$("#end_call").hide();
					// 			    $("#voice_call").show();
				  // 	  			});
					// 		}
					// 		else{
					// 			my_send('{"call_status": "hang_up"}');
					// 		}
					// 		console.log("Value clicked was: "+ v);
					// 	}
					// });

          $("#setDecisionHeader").text("Incoming call");
          $("#setDecisionContent").html("<p>There is an incoming voice call from your partner.</p>");
          $('.ui.decision.modal')
          .modal({
            closable  : false,
            onDeny    : function(){
                send('{"call_status": "hang_up"}');
              },
            onApprove : function() {
              console.log("Approved");
              if(window.localStream.getAudioTracks().length > 0){
    	    							window.localStream.getAudioTracks()[0].enabled = false;
    	    						}
    						  		call.answer(window.localStream);
    					      		call.on('stream', function(stream){
    				    				window.remoteStream = stream;

    						      		//change_status_button("call_button","green");
    						        	$('audio').prop('src', URL.createObjectURL(stream));

    						        	$("#end_call").show();
    							    	$("#voice_call").hide();
    					  	 		});
    				  	  			call.on('close', function(){
    							      	//change_status_button("call_button","red");
    							      	exitFullscreen();
    							  	  	$("#end_call").hide();
    								    $("#voice_call").show();
    				  	  			});
            }
          })
          .modal('show')
          ;






		 	 	}
	 		}
    });





function connectionStart(partnerId) {
  console.log("Starting connection");
  connection = peer.connect(partnerId);
  connection.on('open', function () {
    console.log("Connection open");

    $('div.left.icon').hide();
    $("#disconnect").show();
    receiveData();
  });



}

/////////////////////////////////////////////////////Shared////////////////////////
function receiveData() {
  connection.on('data', function (data) {

    console.log("Receiveing data");
    console.log(data);

   receivingDataProcess(data);



  });

  connection.on('close', function () {
    console.log("Connection closed:Peer");
    $('div.left.icon').show();
    $('div.red.button').hide();
  });
}

/////////////////////////////////Connection for Server///////////////////////////////////

$('#partner').keyup(function (event) {
  if (event.which == 13) {
    var partnerId = $('#partner').val();
    $('#partner').val("");
    connectionStart(partnerId);
    //ui change
  }
})

///////////////Message/////////////////////////////
$('#message').keyup(function (event) {
  if (event.which == 13) {
    var message = $('#message').val();
    $('#message').val("");
    connection.send(message);
  }
})


////////////////////////////////function called///////////////////

function disconnect() {
  console.log("Closing connection");
  connection.close();
  $('div.left.icon').show();
  $("#disconnect").hide();
}
