var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(req,res){
    var pathname = url.parse(req.url).pathname;
    if (pathname !== '/favicon.ico') {
      console.log('Request for ' + pathname + ' received.');

      res.writeHead(200, {'Content-Type': 'text/plain'});
      var content = route(handle, pathname);
      res.write(content);
    }
    res.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started on port 8888.');
}

exports.start = start;
