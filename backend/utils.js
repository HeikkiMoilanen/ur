// convert input url to real url
function toURL(input) {
  var protocolDefined = /[0-9A-Za-z]:\/\/.+/;
  // check if protocol defined in the url
  if (protocolDefined.test(input)) {
    return input;
  } else {
    // if protocol not defined assume it's http
    return "http://" + input;
  }
}

module.exports = {
  toURL: toURL
}
