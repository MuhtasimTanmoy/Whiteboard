function test() {
  //   $('.ui.prompt.modal')
  //   .modal('show')
  // ;

  // $("#setPromptHeader").text("Microphone inactive");
  // $("#setPromptContent").html("<p>Your browser is asking you to activate your microphone.Please activate your microphone and try again.</p>");
  // $('.ui.prompt.modal')
  // .modal({
  //   closable  : false,
  //   onApprove : function() {
  //     log("Approved")
  //   }
  // })
  // .modal('show')
  // ;

  //
  // $("#setDecisionHeader").text("Test");
  // $("#setDecisionContent").html("<p>Your browser is asking you to activate your microphone.Please activate your microphone and try again.</p>");
  // $('.ui.decision.modal')
  // .modal({
  //   closable  : false,
  //   onDeny    : function(){
  //       log("Fuck off")
  //     },
  //   onApprove : function() {
  //     log("Approved")
  //   }
  // })
  // .modal('show')
  // ;

  $('.ui.sidebar').sidebar('toggle');
}

function showAll() {
  console.log("Click");
  var elem = document.getElementById("showOnConnect");
  elem.style.display = "block";

}

function testCall() {
  console.log("CLicked");
}

function drop_handler(event) {
  console.log("Drop");
  event.preventDefault();

  var input = event.target;
  console.log(input.files[0]);
  // If dropped items aren't files, reject them
//  var dt = ev.dataTransfer;

  // if (dt.items) {
  //   // Use DataTransferItemList interface to access the file(s)
  //   for (var i=0; i < dt.items.length; i++) {
  //     if (dt.items[i].kind == "file") {
  //       var f = dt.items[i].getAsFile();
  //       console.log("... file[" + i + "].name = " + f.name);
  //     }
  //   }
  // } else {
  //   // Use DataTransfer interface to access the file(s)
  //   for (var i=0; i < dt.files.length; i++) {
  //     console.log("... file[" + i + "].name = " + dt.files[i].name);
  //   }
  // }
}
