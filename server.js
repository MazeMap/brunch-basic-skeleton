  var express   = require('express');
  var httpProxy = require('http-proxy');


var options = {
  target : { // options for proxy target
    https: true,
    port : 443,
    host : 'https.host.com',
  },
  enable : {
    xforward: true // enables X-Forwarded-For
  },
  changeOrigin: true, // changes the origin of the host header to the target URL
  timeout: 120000 // override the default 2 minute http socket timeout value in milliseconds
};


  var proxy = new httpProxy.RoutingProxy(options);

  var https = require('https');
  var fs = require('fs');

var sysPath = require('path');

function apiProxy(req, res, next) {
    if(req.url.match(new RegExp('^\/someaddresstorereoute'))){
        console.log('regex matched /someaddresstorereoute');
        proxy.proxyRequest(req, res, {host: 'https.host.com', port: 443});
    }else{
      next();
    }
  }


startExpress = function(port, base, path, callback) {
  var server;
  server = express();
  server.use(function(request, response, next) {
    response.header('Cache-Control', 'no-cache');
    return next();
  });

  server.use(apiProxy);
  server.use(base, express["static"](path));

 // server.get("*/jalla", function(request, response) {
 //    return response.sendfile(sysPath.join(path, 'test2.html'));
 //  });


  server.listen(port, callback);
//  https.createServer({}, server);
  return server;
};


exports.startServer = function(port, publicPath, callback) {
    console.log('Started server.js');
    var defaultRoute, expressPort, routes;

    expressPort = port;
    //routes = config.server.routes || {};

    return startExpress(expressPort, '/', publicPath, function(){});
};
