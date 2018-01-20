function loadPdf(event) {
  console.log("Hi");
  var input = event.target;
  var pdfFile = input.files[0];
  var reader = new FileReader();

  function uint8ToString(buf) {
    var i,
      length,
      out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }

  reader.onload = function() {
    arrayBuffer = reader.result;
    console.log(arrayBuffer);
    buffer_array = new Uint8Array(arrayBuffer);

    blob_data_send({pdfcontent: buffer_array});
    // console.log(buffer_array);
    // var pdfBlob = new Blob(buffer_array, {type: "application/pdf"});
    // console.log(pdfBlob);
    // var pdf_url = window.URL.createObjectURL(pdfBlob);
    // console.log(uint8ToString(buffer_array));
    var base64 = uint8ToString(buffer_array);

    console.log("Done");

    var purl = base64;
    // console.log(purl);

    //purl="./a.pdf"

    pdfData = purl;

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
    function renderPage(num) {

      $('#partner').keyup(function(event) {
        if (event.which == 13) {
          var partnerId = $('#partner').val();
          $('#partner').val("");
          connectionStart(partnerId);

          //ui change
        }
      })
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // canvas.height="600";
        // canvas.width="400";

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

    /**
* If another page rendering in progress, waits until the rendering is
* finised. Otherwise, executes rendering immediately.
*/
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    /**
* Displays previous page.


*/



    function onPrevPage() {
        pdf_clear();
      blob_data_send({prev: true});
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
        pdf_clear();
      blob_data_send({next: true});
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
    PDFJS.getDocument({data: pdfData}).then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('page_count').textContent = pdfDoc.numPages;

      // Initial/first page rendering
      renderPage(pageNum);
    });

  };

  reader.readAsArrayBuffer(input.files[0].slice(0, pdfFile.size));
  //

}

function incrementScale(){
  scaleFixer=scaleFixer+0.1;
  console.log(scaleFixer);
  if(scaleFixer<1.6){
  setScale(scaleFixer);
}
}

function decrementScale(){
  scaleFixer=scaleFixer-0.1;
  console.log(scaleFixer);
  if(scaleFixer>0.4){
  setScale(scaleFixer);
}

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
  console.log(num);
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // canvas.height="600";
    // canvas.width="600";

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
      console.log(num);
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


function setScale(scale_in) {
  scale = scale_in;


  // console.log("Here");
  PDFJS.getDocument({data: pdfData}).then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('page_count').textContent = pdfDoc.numPages;

    // Initial/first page rendering
    renderPage(pageNum);
  });

}

$('#pageJump').keyup(function(event) {
  if (event.which == 13) {
    var pageNo = $('#pageJump').val();
    $('#pageJump').val("");

    pageNo=parseInt(pageNo);
    pageNum=pageNo;
    document.getElementById('page_num').textContent = pageNum;

    queueRenderPage(pageNo);
  }
})



function renderPageNo(number){
  pdf_clear();

  queueRenderPage(number);
}
