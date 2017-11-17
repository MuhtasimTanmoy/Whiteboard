function test(){
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


$("#setDecisionHeader").text("Test");
$("#setDecisionContent").html("<p>Your browser is asking you to activate your microphone.Please activate your microphone and try again.</p>");
$('.ui.decision.modal')
.modal({
  closable  : false,
  onDeny    : function(){
      log("Fuck off")
    },
  onApprove : function() {
    log("Approved")
  }
})
.modal('show')
;

  }
