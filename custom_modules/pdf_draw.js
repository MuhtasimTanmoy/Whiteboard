var pathPDF;

// var receivedPath = new Path();
// receivedPath.strokeWidth = 1;
// receivedPath.strokeColor = "#ff0000";

function onMouseDown(event) {
  if (pathPDF) {
    pathPDF.selected = false;
  }
  pathPDF = new Path();
  pathPDF.strokeColor = 'black';
  pathPDF.strokeWidth = 1;
}

function onMouseDrag(event) {
  console.log(event.point);
  pathPDF.add(event.point);
  //send(JSON.stringify(event.point));
}

function onMouseUp(event) {
  //var segmentCount = pathPDF.segments.length;
  pathPDF.simplify();
  //send('{"new_line":"true"}');
}
// window.new_point = function(new_point) {
//   receivedPath.add(new_point);
//   paper.view.update();
// }
// window.new_line = function() {
//   console.log("New line added");
//   receivedPath = new Path({strokeColor: 'red'});
// }
// window.my_clear = function() {
//   paper.project.clear();
//   paper.view.update();
//   path = new Path({strokeColor: 'black'});
//   receivedPath = new Path({strokeColor: 'red'});
//   //send('{"clear":"true"}');
// }
