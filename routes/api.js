var express = require('express');
var mongoose = require('mongoose');

var urlModel = require("../backend/models/urls");
var makeid = require("../backend/utils").makeid;

var router = express.Router();

router.post('/', function(req, res, next) {
  var fluffy = new urlModel({ _id: makeid(), longUrl: 'foo' });
  fluffy.save(function (err, fluffy) {
    if (err) {
      res.json({message: "fail"})
      return console.error(err);
    }
    res.json({message: "jee"})
  });
});

router.get('/:shortUrl', function (req, res, next) {
  var shortUrl = req.params.shortUrl;

  urlModel.find({'_id': shortUrl}, function(err, data) {
    if(err) {
      res.status(err.status || 500);
      var errorMessage = err.message || 'database error';
      res.json({ message: errorMessage });
    } else if(data.length == 0) {
      res.status(404).json({ message: 'not found'} );
    } else if (!data[0].longUrl) {
      res.status(500).json({ message: 'no long url by that id' });
    } else {
      res.json({message: data[0].longUrl});
    }
  });
});

module.exports = router;
