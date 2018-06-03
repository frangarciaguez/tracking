var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
var json;
parseString(xml, function (err, result) {
    //console.dir(result);
    json = result;
});
console.dir(json);