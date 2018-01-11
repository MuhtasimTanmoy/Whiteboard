function loadPdf(event) {
  start = 0
  byte_index = 0
  var input = event.target;


  console.log(input);
  // $("#file_size_sent").text(input.files[0].size);
  // $("#progress_sent").show();
  // console.log(input.files[0]);
  // var incrementer = 0;
  // var reader = new FileReader();
  // blob_data_send({new_file: true, new_size: input.files[0].size, new_type: input.files[0].type, new_name: input.files[0].name});
  // reader.onload = function() {
  //   arrayBuffer = reader.result;
  //   buffer_array = new Uint8Array(arrayBuffer);
  //   blob_data_send({new_pieces: buffer_array});
  //   start = start + chunk_size;
  //   if (start >= input.files[0].size) {
  //
  //     blob_data_send({done: true});
  //     $("#sent_files").prepend('<li>' + input.files[0].name + '</li>');
  //     $("#sent").text('100.00%');
  //
  //   } else {
  //
  //     $("#sent").text(((start / input.files[0].size) * 100).toFixed(2) + '%');
  //     reader.readAsArrayBuffer(input.files[0].slice(start, start + chunk_size));
  //
  //   }
  //   //console.log(arrayBuffer);
  //
  // };
  // reader.readAsArrayBuffer(input.files[0].slice(0, chunk_size));

}
