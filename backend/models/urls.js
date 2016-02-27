var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  _id: String,
  longUrl: String
});

var url = mongoose.model('urls', urlSchema);

module.exports = url;
