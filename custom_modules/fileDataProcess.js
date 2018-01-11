function receivingFile(data) {
  /////////////////////////////File transfer protocol/////////////////////////////
  if (data.new_file == true) {
    partner_file = data.new_size;
    partner_file_type = data.new_type;
    partner_file_name = data.new_name;
    partner_byte_index = 0;
    partner_file_array = new Array();
    $("#file_size").text(data.new_size);
    $("#progress").show();
  }
  if (data.new_pieces != null) {
    var temp_buff = new Uint8Array(data.new_pieces);
    // for(var i =0; i<temp_buff.length; i++){
    // 	partner_file[partner_byte_index++] = temp_buff[i];
    // }
    partner_byte_index += temp_buff.length;
    partner_file_array.push(temp_buff);
    $("#downloaded").text(((partner_byte_index / partner_file) * 100).toFixed(2) + '%');
  }
  if (data.done == true) {
    var partner_buffer_blob = new Blob(partner_file_array, {type: partner_file_type});
    var partner_buffer_url = window.URL.createObjectURL(partner_buffer_blob);
    console.log(partner_buffer_url);
    //my_data_send({done: true});
    if (partner_file_type.split('/')[0] == 'image') {
      //$("#share_img").append('<a href="'+partner_buffer_url+'"  download="'+partner_file_name+'"><img src="'+partner_buffer_url+'" height="200px" width="300px"/></a>');
      $("#download_table").prepend('<tr><td><img src="' + partner_buffer_url + '" height="150px" width="200px" download="' + partner_file_name + '"/></td><td>' + partner_file_name + '</td><td><a href="' + partner_buffer_url + '"  download="' + partner_file_name + '"><span style="color:#ddd">download</span></a></td></tr>');
    } else {
      //$("#share_img").append('<br><a href="'+partner_buffer_url+'"  download="'+partner_file_name+'">'+partner_file_name+'</a><br>');
      $("#download_table").prepend('<tr><td></td><td>' + partner_file_name + '</td><td><a href="' + partner_buffer_url + '"  download="' + partner_file_name + '"><span style="color:#ddd">download</span></a></td></tr>');
    }

    //$("#share_img").append('<img src="'+partner_buffer_url+'" target="_blank" download="file.jpg"/>');
    //$("#share_img").append('<img height="300px" width="500px" src="'+data_temp+'" controls/>');

  }
}
