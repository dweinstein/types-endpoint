var endpoint = require('../index');
var types = require('./types');

require('./server').startServer(endpoint({schemas: types}));

