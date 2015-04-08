# SYNOPSIS

Return a convenient endpoint suitable for
[restify](https://github.com/mcavage/node-restify),
[endpointer](https://github.com/ekristen/endpointer), that returns schema types
for the type name requests.

# USAGE

```
npm i types-endpoint

```

# EXAMPLE

```javascript
var jsonschema = require('jsonschema');
var Validator = require('jsonschema').Validator;
var v = new Validator();

// add some types to the scheme
v.addSchema({
  id: "/type/name",
  type: "string",
  title: "name of something"
  }, "/type/name"
);

// create our endpoint for the schema types
var ep = require('types-endpoint')(v);

// create the server...
var restify = require('restify');
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// wire up endpoint for restify
server.get(ep.path, ep.handler);

// OR with endpointer
var endpoints = new Endpointer();
endpoints.addEndpoint(ep);
endpoints.attach(server)

// listen on port
server.listen(8080)
```

```
% curl -i http://localhost:3000/_types/foo
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 11
Date: Wed, 08 Apr 2015 23:02:22 GMT
Connection: keep-alive

"not found"%``
```

```
% curl -i http://localhost:3000/_types/name
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 63
Date: Wed, 08 Apr 2015 23:02:47 GMT
Connection: keep-alive

{"title":"name of something","id":"/type/name","type":"string"}
```

