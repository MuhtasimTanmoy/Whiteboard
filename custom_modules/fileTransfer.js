function openFile(event) {
  start = 0
  byte_index = 0
  var input = event.target;
  //the_file = new Uint8Array(input.files[0].size);
  $("#file_size_sent").text(input.files[0].size);
  $("#progress_sent").show();
  //console.log("size: "+input.files[0].size);
  console.log(input.files[0]);
  var incrementer = 0;
  var reader = new FileReader();
  //data_temp = "";
  blob_data_send({new_file: true, new_size: input.files[0].size, new_type: input.files[0].type, new_name: input.files[0].name});
  reader.onload = function() {
    arrayBuffer = reader.result;
    buffer_array = new Uint8Array(arrayBuffer);
    blob_data_send({new_pieces: buffer_array});
    start = start + chunk_size;
    // for(var i = 0; i < buffer_array.length; i++){
    // 	the_file[byte_index++] = buffer_array[i];
    // }
    if (start >= input.files[0].size) {
      // buffer_blob = new Blob([the_file]);
      //  buffer_url = window.URL.createObjectURL(buffer_blob);
      blob_data_send({done: true});
      $("#sent_files").prepend('<li>' + input.files[0].name + '</li>');
      $("#sent").text('100.00%');
      // $("#share_img").append('<a href="'+buffer_url+'" target="_blank" download="file.jpg">Link</a>');
      // $("#share_img").append('<img src="'+buffer_url+'" target="_blank" download="file.jpg"/>');
    } else {

      $("#sent").text(((start / input.files[0].size) * 100).toFixed(2) + '%');
      reader.readAsArrayBuffer(input.files[0].slice(start, start + chunk_size));

    }
    //console.log(arrayBuffer);

  };
  reader.readAsArrayBuffer(input.files[0].slice(0, chunk_size));

}

function blob_data_send(data) {
  console.log(data);
  if (blobConnection != null && blobConnection.open == true) {
    blobConnection.send(data);
    //console.log("Sent DATA: "+ data);
  } else {
    //console.log("data not connected");
  }
}
