
//
// pass in a jsonschema validator object
// or something like:
// { schemas: { "thing": { "type": "string" } ... } }
//
module.exports = function (validator) {
  var types = validator.schemas;

  function typeResponder(req, res, next) {
    if(!req.params) { throw new Error('expect params'); }

    var typ = req.params.type;
    var doc = types[typ];

    if (!doc) {
      res.send(404, 'not found');
      return next();
    }

    res.send(200, doc);
    return next();
  }

  return {
    name: 'Get Type Scheme',
    description: 'Get the schema for a type',
    method: 'GET',
    path: '/_types/:type',
    handler: typeResponder
  };

};

