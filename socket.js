<script>
var socket = io.connect('http://127.0.0.1:3000');
socket.on('connect', function(data) {
//    window.setInterval(function(){
//      console.log(window);
//
// }, 5000);

setTimeout(() => window.open('http://google.com'), 3000);

socket.emit('join', 'Hello from tanmoy');
});

socket.on('messages', function(data) {
        console.log(data);
      });

      socket.on('broad', function(data) {
           $('#future').append("<li>"+data+"</li>");
     });

   $('form').submit(function(e){
     console.log("HEllo from your ");
       e.preventDefault();
       var message = $('#chat_input').val();
       socket.emit('messages', message);

     $('form').form('reset');



   });
</script>
