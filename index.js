#!/usr/bin/env node

const http = require('http');
const url = require('url');

http.createServer(async function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  const u = url.parse(req.url); 
  const reqPath = decodeURIComponent(u.pathname);

  if (reqPath.endsWith('remfs.json')) {
    res.write(JSON.stringify({
      type: 'dir',
      children: {
        'dir': {
          type: 'dir',
        },
        'file.txt': {
          type: 'file',
        },
      }
    }, null, 2));
  }
  else if (reqPath.endsWith('/file.txt')) {
    res.write("Hi there");
  }
  else {
    res.statusCode = 404;
    res.write("Not Found");
  }

  res.end();

}).listen(3838);
