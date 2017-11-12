let name = "tanmoy" + Math.floor(Math.random() * 1000 % 10);
var connection;

var last_typed_time = 0;
var typing_timeout;
var unread_messages = 0;
var previous_sender = "none";
var window_focus;


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
  $('div.red.button').show();

});


function connectionStart(partnerId) {
  connection = peer.connect(partnerId);
  connection.on('open', function () {
    console.log("Connection open");

    $('div.left.icon').hide();
    $('div.red.button').show();
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
  $('div.red.button').hide();
}
