function test(){
  console.log("My <reign></reign>");   
  log(responsiveVoice);
  if(responsiveVoice.voiceSupport()) {
    log("HEllo")
    responsiveVoice.speak("hello world");
    }
  }
