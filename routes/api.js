var express = require('express');
var mongoose = require('mongoose');
var shortid = require('shortid');

var urlModel = require("../backend/models/urls");

var router = express.Router();

router.post('/', function(req, res, next) {
  if(!req.headers.longurl) {
    res.json({success: 0, message: "no url specified"});
    return;
  }

  var customURL = "shorturl" in req.headers;
  var shortURL = customURL ? req.headers.shorturl : shortid.generate();

  var newURL = new urlModel({ _id: shortURL, longUrl: req.headers.longurl });
  newURL.save(function (err, result) {
    if (err) {
      var message = customURL ? "url already taken" : "something went wrong - please try again";
      res.json({success: 0, message: message});
      return;
    }
    res.json({success: 1, url: shortURL});
  });
});

module.exports = router;
