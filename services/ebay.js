const request = require('request');
const settings = require('../settings/ebay');
const parseString = require('xml2js').parseString;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require("http");
var https = require("https");

//var id = '253491973014';

exports.getItem = function(id){

	var options = {
		hostname: [
    		"api",
    		"ebay",
    		"com"
  		],
  		path: [
    		"ws",
    		"api.dll"
  		],
	  	method: "POST",
	  	headers: {
			'X-EBAY-API-SITEID': "186",
			'X-EBAY-API-COMPATIBILITY-LEVEL': "967",
			'X-EBAY-API-CALL-NAME': "GetItem",
			'Content-Type': "application/xml",
			'Accept': "application/json",
			'Cache-Control': "no-cache"
	  	}
	};

	var req = https.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
		chunks.push(chunk);
	  });

	  res.on("end", function () {
		var body = Buffer.concat(chunks);
		//console.log(body.toString());
		//return body;
	  });
	});

	req.write("<?xml version='1.0' encoding='utf-8'?><GetItemRequest xmlns='urn:ebay:apis:eBLBaseComponents'><RequesterCredentials><eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**zPyjWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADlIunCZWGoQqdj6x9nY+seQ**7i8EAA**AAMAAA**Lp54DVQhH1xkGzPhqP7EFnAUBkEPfg86Rixho5+hno6wkpQBFS94ThA3j4wHFxdDgF07wCeAaqKH3sksQqgl9Bz9FV/rRAVBmDBld4rE1SAI1Llbnw8UdMMFYWD3bLbxSL76Elx3i2ziBvV7nZI8lr36ItA14rHY1j75UC3TinIzaM43xjAnGZT3RkifXbfvBLFbY7Exsh5p2WI9D6DtdF7ShVCKjMlH35qcEyWJA8eCKLoPNaaId13u3QMS7q5pQEwINOqS8m0KuqTBGEzn3eA/U7fguPBnMNF/FBa2pIDZA1j7PLBfDR1WqJPc258EKoYtTa6QnR18zE0KkM/rG3btkh2RXX31O28EtRM7qYi2HTralS/RLP6jhHTgRlaVWg+pJ4zdviup35wRcTaY7kw+riA81gTOqlzWfufKL7/FLfcPkzdooMdCMFUYo7prAlurlZcTUiyLpElZfcOHCdTIHj7WOOoCAR2gkM4m93yneSYJFD6IFKt6t2iWBTGCBTnfnh6PBSxCsssWon7TO37vBCW+7fvFzks1zpTSDyTkfAwc7m/Fa68Sh1WudQIiRE7m0VPf0rm4Vhhw6dHTt1qI6Pmns9wJObOSK35ZNZlLJM9iRKl/2N8Gp0yvFJgO/+2M/t0MAH7HPYcFwesTraKC9Nj+By6Q+DfUXjHby30EFjWymLIGNhtxBBFeBMavBwsv5NCI6cDzozSa2MR0i1kBozdawNFCD7Av4PH6SMKWS1nRxO8FdO27hx5UjJdV</eBayAuthToken></RequesterCredentials><ErrorLanguage>en_US</ErrorLanguage><WarningLevel>High</WarningLevel><!--Enter an ItemID--><ItemID>122463839330</ItemID></GetItemRequest>");
	req.end();
	
};