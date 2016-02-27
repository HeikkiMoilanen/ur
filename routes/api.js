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
	var shortUrl = req.params.shortUrl

	urlModel.find({'_id': shortUrl}, function(err, data) {
		if(err || data.length == 0 || !data[0].longUrl) {
			res.status(404).send('not found');
		} else {
			res.json({message: data[0].longUrl})
		}
	});
});

module.exports = router;
