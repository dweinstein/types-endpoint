
module.exports.startServer = function(routes) {

  routes = [].concat(routes);
  debugger;

  var Endpointer = require('endpointer/restify');
  var restify = require('restify');

  var server = restify.createServer({
    name: 'test server',
  });

  server.pre(restify.pre.sanitizePath()); // trailing slash
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.authorizationParser());
  server.use(restify.dateParser());
  server.use(restify.queryParser());
  server.use(restify.jsonp());
  server.use(restify.gzipResponse());
  server.use(restify.bodyParser());
  server.use(restify.conditionalRequest());

  server.on('after', function(req, res, route, error) {
    var latency = res.get('Response-Time');
    if (typeof (latency) !== 'number')
      latency = Date.now() - req._time;
    console.log('REQUEST -', {
      method: req.method, url: req.url, code: res.statusCode, agent: req.header('user-agent'),
      latency: latency, remote: req.header('x-forwarded-for', req.connection.remoteAddress)
    });
    console.log('REQUEST HEADERS - ', req.headers);
  });

  var endpoints = new Endpointer({
    endpoints: null,
    docs: {
      title: routes.name,
      enabled: true
    },
    version: '1.0.0'
  });

  routes.forEach(function (route) {
    endpoints.addEndpoint(route);
  });

  endpoints.attach(server);

  server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

};

