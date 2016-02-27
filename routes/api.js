var express = require('express');
var mongoose = require('mongoose');
var shortid = require('shortid');

var urlModel = require("../backend/models/urls");

var router = express.Router();

router.post('/', function(req, res, next) {
  if(!req.headers.longurl) {
    res.status(400).json({message: "no url specified"});
    return;
  }

  var customURL = "shorturl" in req.headers;
  var shortURL = customURL ? req.headers.shorturl : shortid.generate();

  var newURL = new urlModel({ _id: shortURL, longUrl: req.headers.longurl });
  newURL.save(function (err, result) {
    if (err) {
      if(customURL)
        res.status(400).json({message: "url already taken"});
      else
        res.status(500).json({message: "something went wrong - please try again"});
      return;
    }
    res.status(201).json({url: shortURL});
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
