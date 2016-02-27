var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("bwahaha");
	var oldUrl = "";
	res.sendFile(path.resolve(__dirname + '/../frontend/index.html'));
  	//res.render('index', { title: 'Express' });
});

module.exports = router;
