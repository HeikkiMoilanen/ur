var express = require('express');
var mongoose = require('mongoose');
var shortid = require('shortid');

var urlModel = require("../backend/models/urls");
var toURL = require("../utils").toURL;

var router = express.Router();

router.post('/', function(req, res, next) {
  if(!req.headers.longurl || typeof req.headers.longurl != "string" || req.headers.longurl.length === 0) {
    res.status(400).json({message: "no url specified"});
    return;
  }

  var customURL = "shorturl" in req.headers;
  var shortURL = customURL ? req.headers.shorturl : shortid.generate();

  var newURL = new urlModel({ _id: shortURL, longUrl: toURL(req.headers.longurl) });
  newURL.save(function (err, result) {
    if (err) {

      if (customURL) {
        res.status(400).json({message: "url already taken"});
      } else {
        var message = err.message || "something went wrong - please try again";
        res.status(err.status || 500);
        res.json({message: message});
      }

    } else {
      res.status(201).json({url: shortURL});
    }
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
