const request = require('request');
const settings = require('../settings/ebay');
const parser = require('xml2json');
const ebayDoc = require('../services/ebayDocs');
const apiDoc = require('../services/apiDocs');

function getEbayItem(req,res){
	var id = req.params.id;
    var ebayOptions = ebayDoc.GetItem(id);
    
    request(ebayOptions, function (err, res2, body) {
        if(err){
            res.status(500).send({message: err});
        }else{
        	var options = {
            	object: true,
            	reversible: false,
            	coerce: false,
            	sanitize: true,
            	trim: true,
            	arrayNotation: false,
            	alternateTextNode: false
        	};
        	var json = parser.toJson(body, {object:true});
        	var itemOptions = apiDoc.SaveItem(json);
        	
        	request(itemOptions, function (error, res3, body) {
              	if(error){
                    res.status(500).send({message: error});
                }else{
                    res.status(200).send({message:'Item Successfully Stored!'});
                }
        	});
        }
    });
}

function getEbayItemUpdate(req,res){
	var internalID = req.params.id;

    var itemOptions = { 
    	method: 'GET',
      	url: 'http://172.31.0.184:8080/api/item/'+internalID,
      	headers: { 
    		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
         	'Cache-Control': 'no-cache',
         	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
         	'Content-Type': 'application/json' 
    	},
    	json: true,
    	body: {}
    };    

    request(itemOptions, function (error, response, body) {
        if(error){
            res.status(500).send({message: error});
        }else{
          	var externalID = body.item.externalID;
          	var product = body.item.product;
          	var seller = body.item.seller;
          	var ebayOptions = ebayDoc.GetItem(externalID);
            
            request(ebayOptions, function (err, res2, body) {
                if(err){
                    res.status(500).send({message: err});
                }else{
                    var parserOptions = {
                    	object: true,
                    	reversible: false,
                    	coerce: false,
                    	sanitize: true,
                    	trim: true,
                    	arrayNotation: false,
                    	alternateTextNode: false
                	};
                	var json = parser.toJson(body, parserOptions);
                	var itemUpdateOptions = apiDoc.SaveItemUpdate(internalID,product,seller,json);
                    
                	request(itemUpdateOptions, function (error, response, body) {
                  		if(error){
                        	res.status(500).send({message: error});
                        }else{
                            res.status(200).send({message:'Item Update Successfully Stored!'});
                        }
                	});
                }
            });
        }
    });
}

module.exports = {
    getEbayItem,
    getEbayItemUpdate
};