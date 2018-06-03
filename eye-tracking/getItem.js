const request = require('request');
const settings = require('./settings');

const parseString = require('xml2js').parseString;

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// Database
var dirty = require('dirty');
var daily = dirty('daily.db');

// Variables
var id = '253491973014';
var item;
var json;

// Date
//var now1 = new Date(year, month, day);
//now2 = now1(toString);

const options = {
    url: settings.EBAY_URL,
    method: 'POST',
    body: '<?xml version="1.0" encoding="utf-8"?>\r\n<GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\r\n  <RequesterCredentials>\r\n    <eBayAuthToken>' + settings.EBAY_AUTH_TOKEN + '</eBayAuthToken>\r\n  </RequesterCredentials>\r\n\t<ErrorLanguage>en_US</ErrorLanguage>\r\n\t<WarningLevel>High</WarningLevel>\r\n      <!--Enter an ItemID-->\r\n  <ItemID>' + id + '</ItemID>\r\n</GetItemRequest>',
    headers: {
        'Postman-Token': settings.POSTMAN_TOKEN,
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/xml',
        'X-EBAY-API-CALL-NAME': 'GetItem',
        'X-EBAY-API-COMPATIBILITY-LEVEL': '967',
        'X-EBAY-API-SITEID': '186'
    }
};

request(options, function (err, res, body) {
    //item = body.toString();

    parseString(body, function (err, result) {
        json = result;
    });
    
    //console.dir(json, { depth: null });
});

const server = http.createServer((req2, res2) => {
    res2.statusCode = 200;
    res2.setHeader('Content-Type', 'text/plain');
    res2.write(json.GetItemResponse.Timestamp.toString());
    res2.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


daily.on('load', function () {
    daily.set(id.toString(), { info: 'value' });
    console.log('Added ' + id.toString() + '- hello:', daily.get(id.toString()).info);

    daily.forEach(function (key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
});


daily.on('drain', function () {
    console.log('All records are saved on disk now.');
});


