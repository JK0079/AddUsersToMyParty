
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  var router = express.Router();

    router.get('/', function (req, res) {
    console.log('from node');
    console.log(req.params);

    var fs = require('fs');
    res.json({status: 'UP'});

  });

  router.post('/', function (req, res) {
    console.log('from node');
    console.log(req.body);

    var fs = require('fs');
    fs.appendFile('./public/person.json',JSON.stringify(req.body));
    res.json({status: 'UP'});

  });

  app.use("/saveInfo", router);
}
