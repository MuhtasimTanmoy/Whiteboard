let name = "t" + Math.floor(Math.random() * 1000 % 10);
var connection;
var blobConnection;

var last_typed_time = 0;
var typing_timeout;
var unread_messages = 0;
var previous_sender = "none";
var window_focus;
var call;
var my_prompt = null;

var stat_my_id = "-";
var stat_my_mic = "-";
var stat_my_video = "-";
var stat_my_size = "-";

var stat_partner_id = "-";
var stat_partner_mic = "-";
var stat_partner_video = "-";
var stat_partner_size = "-";

var connect_timeout;

var arrayBuffer;
var buffer_array;
var buffer_blob;
var buffer_url;
var chunk_size = 1024 * 4;
var byte_index;
var start;
var the_file; // = new Uint8Array(input.files[0].size);
var partner_file;
var partner_byte_index;
var partner_file_type;
var partner_file_name;
var partner_file_array;


var pdfDoc = null;
var pageNum = 1;
var pageRendering = false;
var pageNumPending = null;

var scale = 1.2,
canvas = document.getElementById('pdf-holder-new'),
ctx = canvas.getContext('2d');
var pdfData;

var scaleFixer=scale;

var currentlyIn="DashBoard";


//////////////////////////Snake_game////////////
var snake_upperPlayer;
var d;
var d2;
var food= {
  x: 0,
  y: 0,
};

function changeD(data){
  d=data;
  console.log("Called in the main game");
}

function changeD2(data){
  d2=data;
  console.log("Called in the main game");
}

 function changeFood(data){
   console.log("This one food");
  food= {
    x: data.x,
    y: data.y,
  };

  console.log(food);
 }
// var peer = new Peer(name, {key: 'a2fqeua8vn78ehfr'});

// var peer = new Peer(name, {
//   host: 'localhost',
//   port: 3000,
//   path: '/api',
//   debug:3
// });

//
var peer = new Peer(name, {host: 'localhost', port: 9000,debug:3, path: '/',config: {icerServers: [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
     credential: 'randompass',
     username: 'mtanmoy5086@gmail.com' }
 ]}
});


console.log(peer.id + " started.");

$('#myId').html("<h3 > id: " + peer.id + "</h3>");
////debug
showDashBoard();

//////////Connection for client////////////////////

peer.on('connection', function(conn) {

  if (conn.metadata == "connection") {

    connection = conn;

    $("#connect_notify").html('<h3 style="color:#a3a3a3;">Partner:  '+connection.peer+' in '+ currentlyIn +' </h3>');

    console.log(connection.peer + " Connected");
    receiveData();

    $('div.left.icon').hide();
    $("#disconnect").show();


    ///transition
    var elem = document.getElementById("showOnConnect");
    elem.style.display="block";
    elem = document.getElementById("sideBarContent");
    elem.style.display="block";
    elem = document.getElementById("particleHolder");
    elem.style.display="none";
    showDashBoard();



  } else if (conn.metadata == "blob") {
    blobConnection = conn;

    console.log(connection.peer + " Data channel Connected");
    receiveBlobData();

  }

});


peer.on('error',function(err){
  console.log("Error on peer called");
  console.log(err);

});

peer.on('close',function(){
  console.log("Peer closed");
  //peer.distroy();
});


// peer.on('disconnected',function(){
//   console.log("Peer disconnected");
//   peer.reconnect();
// })


/////////////////Connection for call/////////////////////////////////

peer.on('call', function(call_in) {
  call = call_in;
  console.log("Received call");
  console.log(call.metadata);
  if (call.metadata == "voice") {
    if (window.localStream == null || window.localStream.getAudioTracks().length == 0) {
      get_mic();
      send('{"call_status": "mic_inactive"}');

      $("#setPromptHeader").text("Incoming call");
      $("#setPromptContent").html("<p>There is an incoming voice call from your partner, but your microphone is not activated. Please activate your microphone.</p>");
      $('.ui.prompt.modal').modal({
        closable: false,
        onApprove: function() {
          console.log("Approved");
        }
      }).modal('show');

    } else {


      $("#setDecisionHeader").text("Incoming call");
      $("#setDecisionContent").html("<p>There is an incoming voice call from your partner.</p>");
      $('.ui.decision.modal').modal({
        closable: false,
        onDeny: function() {
          send('{"call_status": "hang_up"}');
        },
        onApprove: function() {
          console.log("Approved");
          if (window.localStream.getAudioTracks().length > 0) {
            window.localStream.getAudioTracks()[0].enabled = false;
          }
          call.answer(window.localStream);
          call.on('stream', function(stream) {
            window.remoteStream = stream;

            //change_status_button("call_button","green");
            $('audio').prop('src', URL.createObjectURL(stream));

            $("#end_call").show();
            $("#voice_call").hide();
          });
          call.on('close', function() {
            //change_status_button("call_button","red");
            $("#end_call").hide();
            $("#voice_call").show();
          });
        }
      }).modal('show');

    }
  }

  if(call.metadata == "video"){
		      	if(window.localStream == null || window.localStream.getVideoTracks().length == 0){
		      		get_cam();
		      		send('{"call_status": "cam_inactive"}');

            $("#setPromptHeader").text("Incoming video call");
            $("#setPromptContent").html("<p>There is an incoming voice call from your partner, but your camera is not activated. Please activate your microphone.</p>");
            $('.ui.prompt.modal').modal({
              closable: false,
              onApprove: function() {
                console.log("Approved");
              }
            }).modal('show');

		      	}
		      	else{

              $("#setDecisionHeader").text("Incoming video call");
              $("#setDecisionContent").html("<p>There is an incoming video call from your partner.</p>");
              $('.ui.decision.modal').modal({
                closable: false,
                onDeny: function() {
                  send('{"call_status": "hang_up_video"}');
                },
                onApprove: function() {
                  console.log("Approved");
                  if(window.localStream.getVideoTracks().length > 0){
  	    							window.localStream.getVideoTracks()[0].enabled = true;
  	    						}
  						  		call.answer(window.localStream);
  					      		call.on('stream', function(stream){
  				    				window.remoteStream = stream;

  						        	$('#their-video').prop('src', URL.createObjectURL(stream));
  						        	$("#end_video_call").show();
  							    	$("#video_call").hide();
  							    	$("#cancel_video_call").hide();
  					  	 		});
  				  	  			call.on('close', function(){
  							  	  	$("#end_video_call").hide();
  								    $("#video_call").show();
  								    $("#floating_video").hide();
  				  	  			});
                }
              }).modal('show');
		 	 	}
	 		}
});
function connectionStart(partnerId) {
  console.log("Starting connection");
  connection = peer.connect(partnerId, {metadata: "connection"});

  clearTimeout(connect_timeout);
  connect_timeout = setTimeout(function() {
    if (connection.open == false) {
      $("#partner").show();
      $("#disconnect").hide();
      $("#connect_notify").html('Failed.Try again');
    }
  }, 10000);
  $("#connect_notify").html('<span style="color:orange;">Trying to connect</span>');

  connection.on('open', function() {
  clearTimeout(connect_timeout);
    $("#connect_notify").html('<h3 style="color:#a3a3a3;">Partner:  '+connection.peer+' > '+ currentlyIn +'</h3>');

    console.log("Connection open");
    console.log(connection);

    $('div.left.icon').hide();
    $("#disconnect").show();



    ///transition
    var elem = document.getElementById("showOnConnect");
    elem.style.display="block";
    elem = document.getElementById("sideBarContent");
    elem.style.display="block";
    elem = document.getElementById("particleHolder");
    elem.style.display="none";
    showDashBoard();


    receiveData();
  });

  blobConnection = peer.connect(partnerId, {metadata: "blob"});
  blobConnection.on('open', function() {
    console.log("BLob connection open");
    console.log(connection);
    receiveBlobData();
  });

}

/////////////////////////////////////////////////////Shared////////////////////////
function receiveData() {
  connection.on('data', function(data) {
    console.log("Receiveing data");
    console.log(data);
    receivingDataProcess(data);
  });

  connection.on('close', function() {
    console.log("Connection closed:Peer");
    $('div.left.icon').show();
    $('#disconnect').hide();


    var elem = document.getElementById("showOnConnect");
    elem.style.display="none";
    elem = document.getElementById("sideBarContent");
    elem.style.display="none";
    elem = document.getElementById("particleHolder");
    elem.style.display="block";
  });
}

function receiveBlobData() {
  blobConnection.on('data', function(data) {
    console.log("Receiveing blob data");
    //console.log(data);
    receivingFile(data);
  });

  blobConnection.on('close', function() {
    console.log("Connection closed:BLob");
  });
}

/////////////////////////////////Connection for Server///////////////////////////////////

$('#partner').keyup(function(event) {
  if (event.which == 13) {
    var partnerId = $('#partner').val();
    $('#partner').val("");
    connectionStart(partnerId);

    //ui change
  }
})

///////////////Message/////////////////////////////
$('#message').keyup(function(event) {
  if (event.which == 13) {
    var message = $('#message').val();
    $('#message').val("");
    connection.send(message);
  }
})

////////////////////////////////function called///////////////////

function disconnect() {

  $("#setDecisionHeader").text("Confirm");
  $("#setDecisionContent").html("<p>Do you really want to terminate this session?</p>");
  $('.ui.decision.modal').modal({
    closable: false,
    onDeny: function() {

    },
    onApprove: function() {
      console.log("Approved");
      console.log("Closing connection");
        if(connection){
      connection.close();}
      $('div.left.icon').show();
      $("#disconnect").hide();
      $("#connect_notify").hide();

      var elem = document.getElementById("showOnConnect");
      elem.style.display="none";
      elem = document.getElementById("sideBarContent");
      elem.style.display="none";
      elem = document.getElementById("particleHolder");
      elem.style.display="block";

    }
  }).modal('show');

}
