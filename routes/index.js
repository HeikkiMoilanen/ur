var express = require('express');
var router = express.Router();
var path = require('path');
var urlModel = require("../backend/models/urls");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../frontend/index.html'));
});

router.get('/:shortURL', function(req, res, next) {
	urlModel.find({_id: req.params.shortURL}, function(err, results){
		if(err) {
			// do something here
		} else if (results.length === 0) {
			// 404
		} else {
			res.redirect(results[0].longUrl);
		}
	});
});

module.exports = router;
