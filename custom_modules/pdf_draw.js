var pathPDF;

var receivedPathPDF = new Path();
receivedPathPDF.strokeWidth = 1;
receivedPathPDF.strokeColor = "#ff0000";

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
  send(JSON.stringify(event.point));
}

function onMouseUp(event) {
  //var segmentCount = pathPDF.segments.length;
  pathPDF.simplify();
  send('{"new_line_PDF":"true"}');
}
new_point = function(new_point) {
  receivedPathPDF.add(new_point);
  paper.view.update();
}
new_line = function() {
  console.log("New line added");
  receivedPathPDF = new Path({strokeColor: 'red'});
}
pdf_clear = function() {
  paper.project.clear();
  paper.view.update();
  path = new Path({strokeColor: 'black'});
  receivedPathPDF = new Path({strokeColor: 'red'});
  //send('{"clear":"true"}');
}
