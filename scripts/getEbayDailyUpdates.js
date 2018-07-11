const request = require('request');
const apiDoc = require('../services/apiDocs');

var item;
var page = 1;
var itemOptions = apiDoc.GetItems(page);
var itemUpdateOptions;
var totalItems;
var numPages;
var itemID;


request(itemOptions, function (error, response, body) {
    if(error){
        console.log('Error in the request to retrieve the list of items');
    }else{
        totalItems = body.totalItems;
        numPages = Math.floor(body.totalItems/10)+1;
        
        for(page = 1; page <= numPages; page++) {
            itemOptions = apiDoc.GetItems(page);
            
            request(itemOptions, function (error, response, body) {
                if(error){
                    console.log('Error in the request to retrieve the list of items');
                }else{
                    for (item in body.items){
                        itemID = body.items[item]._id;
                        itemUpdateOptions = apiDoc.GetEbayItemUpdate(itemID);
                        
                        request(itemUpdateOptions, function (error, response, body) {
                  		    if(error){
                  		        console.log('Error in the request GetItemUpdate');
                            }else{
                                console.log('Saved Item Update');
                            }
                	    });
                    }
                }
            });
        }
    }
});

