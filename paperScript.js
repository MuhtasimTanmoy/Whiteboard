<!-- <script type="text/paperscript" canvas="canvas" data-paper-ignore="true">
    var path;


    // var textItem = new PointText({
    //     content: 'Click and drag to draw a line.',
    //     point: new Point(20, 30),
    //     fillColor: 'black',
    // });

    function onMouseDown(event) {
        // If we produced a path before, deselect it:
        if (path) {
            path.selected = false;
        }

        // Create a new path and set its stroke color to black:
        path = new Path({
           // segments: [event.point],
            strokeColor: 'black'
            // Select the path, so we can see its segment points:
           // fullySelected: true
        });

    }
    // path = new Path({

    //         strokeColor: 'black',
    //         // Select the path, so we can see its segment points:
    //         //fullySelected: true
    //     });
    //  path.importJSON('["Path",{"applyMatrix":true,"selected":true,"segments":[{"x":748,"y":463,"selected":true},[748,462],[752,457],[762,444],[778,422],[795,398],[811,374],[830,351],[849,333],[871,313],[890,298],[922,276],[943,262],[968,246],[993,232],[1017,221],[1031,217],[1052,213],[1069,210],[1091,209],[1109,209],[1128,209],[1146,214],[1163,221],[1176,227],[1196,236],[1209,242],[1225,246],[1239,248],[1250,248],[1257,246],[1261,239],[1262,230],[1264,201],[1267,177],[1270,141],[1271,121],[1271,101],[1267,91],[1256,86],[1235,84],[1194,82],[1159,81],[1116,80],[1080,80],[1059,80],[1037,84],[1021,89],[1005,95],[991,102],[981,106],[968,112],[958,116],[948,120],[939,123],[930,126],[924,126],[920,126]],"strokeColor":[0,0,0]}]');
    // // While the user drags the mouse, points are added to the path
    // at the position of the mouse:
    function onMouseDrag(event) {
        path.add(event.point);
        // console.log(event.point);
        // console.log(JSON.stringify(event.point));
        // var tempasdf = JSON.stringify(event.point);
        // var fdsa = JSON.parse(tempasdf);
        // console.log(fdsa);
        // var new_point = {x: fdsa[1], y: fdsa[2]};
        // path.add(new_point);
        // console.log(new_point);
       // var point = new Array({points: event.point});
        //point['points'].push(event.point);
      //  my_send(JSON.stringify(event.point));
        //my_send(path.exportJSON());
        //console.log(event);
       // console.log(path.exportJSON());
        // Update the content of the text item to show how many
        // segments it has:
        //textItem.content = 'Segment count: ' + path.segments.length;
    }

    // When the mouse is released, we simplify the path:
    function onMouseUp(event) {
        var segmentCount = path.segments.length;
        console.log(path.exportJSON());
        //my_send('{"new_line":"true"}');
        // When the mouse is released, simplify it:
       // path.simplify(10);

        // Select the path, so we can see its segments:
        //path.fullySelected = true;

        // var newSegmentCount = path.segments.length;
        // var difference = segmentCount - newSegmentCount;
        // var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
        // textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';

       // path.strokeColor = 'red';
        //my_send(path.exportJSON());
        //path.strokeColor = 'black';
    }
    window.new_point = function(new_point){
      their_path.add(new_point);
      paper.view.update();
    }
    window.new_line = function(){
      their_path = new Path({

            strokeColor: 'red'
            // Select the path, so we can see its segment points:
            //fullySelected: true
        });
    }
    window.my_draw = function(to_draw){
       // their_path = new Path({

      //       strokeColor: 'red'
      //       // Select the path, so we can see its segment points:
      //       //fullySelected: true
      //   });
      console.log(to_draw);
      // var my_to_draw = JSON.parse(to_draw);
      // my_to_draw[1][strokeColor][0] = 1;
      // my_to_draw = JSON.stringify(my_to_draw);
      // console.log(my_to_draw);
      their_path.importJSON(to_draw);
      paper.view.update();
      //path.update();
      // path.importJSON('["Path",{"applyMatrix":true,"selected":true,"segments":[{"x":748,"y":463,"selected":true},[748,462],[752,457],[762,444],[778,422],[795,398],[811,374],[830,351],[849,333],[871,313],[890,298],[922,276],[943,262],[968,246],[993,232],[1017,221],[1031,217],[1052,213],[1069,210],[1091,209],[1109,209],[1128,209],[1146,214],[1163,221],[1176,227],[1196,236],[1209,242],[1225,246],[1239,248],[1250,248],[1257,246],[1261,239],[1262,230],[1264,201],[1267,177],[1270,141],[1271,121],[1271,101],[1267,91],[1256,86],[1235,84],[1194,82],[1159,81],[1116,80],[1080,80],[1059,80],[1037,84],[1021,89],[1005,95],[991,102],[981,106],[968,112],[958,116],[948,120],[939,123],[930,126],[924,126],[920,126]],"strokeColor":[0,0,0]}]');
    }
    window.my_clear = function(){
      paper.project.clear();
      paper.view.update();
      path = new Path({

            strokeColor: 'black'

        });
        their_path = new Path({

            strokeColor: 'red'
            // Select the path, so we can see its segment points:
            //fullySelected: true
        });
    }
    window.save_img = function(){
      var canvas = document.getElementById("canvas");
      var img = canvas.toDataURL("image/png");
      $("#draw").append('<img class="my_save" height="250px" width="250px" src="'+img+'"/>');
    }
</script>
<div class="row" style="padding-top: 20px">
  <div class="column">
    <canvas id="canvas" resize="" style="user-select: none; touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(1, 0, 0, 0);" width="1046" height="553" data-paper-scope="1"></canvas>
      </div>
  </div> -->
