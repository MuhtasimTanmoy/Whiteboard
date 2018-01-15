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

  if(data.next==true){
    console.log("PDF Next has come");
    if (pageNum >= pdfDoc.numPages) {
    return;
    }
    pageNum++;
    queueRenderPage(pageNum);

  }

  if(data.prev==true){
    console.log("PDF prev has come");
    if (pageNum <= 1) {

    return;
    }
    pageNum--;
    queueRenderPage(pageNum);

  }



  function queueRenderPage(num) {
  if (pageRendering) {
  pageNumPending = num;
  } else {
  renderPage(num);
  }
  }

  function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
  var viewport = page.getViewport(scale);
  // canvas.height = viewport.height;
  // canvas.width = viewport.width;

  canvas.height="1000";
  canvas.width="800";

  // Render PDF page into canvas context
  var renderContext = {
  canvasContext: ctx,
  viewport: viewport
  };
  var renderTask = page.render(renderContext);

  // Wait for rendering to finish
  renderTask.promise.then(function() {
  pageRendering = false;
  if (pageNumPending !== null) {
  // New page rendering is pending
  renderPage(pageNumPending);
  pageNumPending = null;
  }
  });
  });

  // Update page counters
  document.getElementById('page_num').textContent = pageNum;
  }

  if(data.pdfcontent!=null){
    var temp_buff=new Uint8Array(data.pdfcontent);
    console.log(temp_buff);

    function uint8ToString(buf) {
var i, length, out = '';
for (i = 0, length = buf.length; i < length; i += 1) {
out += String.fromCharCode(buf[i]);
}
return out;
}



    var base64 = uint8ToString(temp_buff);


    console.log("Done");

    var purl = base64;
    // console.log(purl);


    //purl="./a.pdf"



    var pdfData = purl;

// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
// PDFJS.disableWorker = true;

// The workerSrc property shall be specified.
PDFJS.workerSrc = './pdf.worker.js';




/**
* Get page info from document, resize canvas accordingly, and render page.
* @param num Page number.
*/


/**
* If another page rendering in progress, waits until the rendering is
* finised. Otherwise, executes rendering immediately.
*/


/**
* Displays previous page.
*/
function onPrevPage() {
  blob_data_send({prev:true});

if (pageNum <= 1) {

return;
}
pageNum--;
queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
* Displays next page.
*/
function onNextPage() {
  blob_data_send({next:true});

if (pageNum >= pdfDoc.numPages) {
return;
}
pageNum++;
queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
* Asynchronously downloads PDF.
*/
PDFJS.getDocument({data:pdfData}).then(function(pdfDoc_) {
pdfDoc = pdfDoc_;
document.getElementById('page_count').textContent = pdfDoc.numPages;

// Initial/first page rendering
renderPage(pageNum);
});

  }
}
