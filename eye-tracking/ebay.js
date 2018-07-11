const request = require('request');
const settings = require('../settings/ebay');
//const parseString = require('xml2json').parseString;
var parser = require('xml2json');

// Variables
var id = '253491973014';

var ebayOptions = {
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

var itemOptions = { 
	method: 'POST',
  	//url: 'http://localhost:3977/api/item',
  	url: 'http://172.31.0.184:8080/api/item',
  	headers: { 
		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
     	'Cache-Control': 'no-cache',
     	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
     	'Content-Type': 'application/json' 
	},
	json: true,
	body: {}
};

request(ebayOptions, function (err, res, body) {
	var options = {
    	object: true,
    	reversible: false,
    	coerce: false,
    	sanitize: true,
    	trim: true,
    	arrayNotation: false,
    	alternateTextNode: false
	};
	var json = parser.toJson(body, options);
	
	var externalID = json.GetItemResponse.Item.ItemID;
	var category = json.GetItemResponse.Item.PrimaryCategory.CategoryName;
	var url = json.GetItemResponse.Item.ListingDetails.ViewItemURL;
	var title = json.GetItemResponse.Item.Title;
	
	itemOptions.body = {
		title: title,
		url: url,
		category: category,
		allInfo: 'json',
		source: 'ebay',
		externalID: externalID,
		mainPicture: 'null',
		product: '5b2fb6f1abe6ca03e6287c9f',
		seller: '5b26dbebe9d74002022d39c7' 
	};
	//console.log(itemOptions.body.title);
	request(itemOptions, function (error, response, body) {
  		if (error) throw new Error(error);
	});
});
