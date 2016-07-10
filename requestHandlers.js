var querystring = require('querystring'),
  fs = require('fs'),
  formidable = require('formidable');

function start(res, postData) {
  console.log('Request handler \'start\' was called.');

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html" ' +
    'charset="UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload File" />' +
    '</form>' +
    '</body>' +
    '</html>';

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('Request handler \'upload\' was called.');

  var form = new formidable.IncomingForm();
  console.log('About to parse.');
  form.parse(req,function(error,fields,files) {
    console.log('Parsing done!');

    /* Rename function with Windows fs fix */
    fs.rename(files.upload.path, '/tmp/test.png', function(error){
      if (error) {
        fs.unlink('/tmp/test.png'); // unlink is delete file
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Received image:<br/>');
    res.write('<img src="/show" />');
    res.end();
  });

}

function show(res) {
  console.log('Request handler \'show\' was called.');
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('/tmp/test.png').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
