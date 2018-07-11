const settings = require('../settings/ebay');

function SaveItem(json){
    if(!json){
        throw new Error('Whoops!');
    }else{
        var externalID = json.GetItemResponse.Item.ItemID;
    	var category = json.GetItemResponse.Item.PrimaryCategory.CategoryName;
    	var url = json.GetItemResponse.Item.ListingDetails.ViewItemURL;
    	var title = json.GetItemResponse.Item.Title;
        var document = { 
        	method: 'POST',
          	url: 'http://172.31.0.184:8080/api/item',
          	headers: { 
        		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
             	'Cache-Control': 'no-cache',
             	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
             	'Content-Type': 'application/json' 
        	},
        	json: true,
        	body: {
        		title: title,
        		url: url,
        		category: category,
        		allInfo: json,
        		source: 'ebay',
        		externalID: externalID,
        		mainPicture: 'null',
        		//product: '5b2fb6f1abe6ca03e6287c9f',
        		//seller: '5b26dbebe9d74002022d39c7'
        	}
        };

        return document;
    }
};

function SaveItemUpdate(item,product,seller,json){
    if(!json){
        throw new Error('Whoops!');
    }else{
        var externalID = json.GetItemResponse.Item.ItemID;
        var category = json.GetItemResponse.Item.PrimaryCategory.CategoryName;
        var url = json.GetItemResponse.Item.ListingDetails.ViewItemURL;
        var title = json.GetItemResponse.Item.Title;
        var timestamp = json.GetItemResponse.Timestamp;
        var quantity = json.GetItemResponse.Item.Quantity;
        var quantitySold = json.GetItemResponse.Item.SellingStatus.QuantitySold;
        var currentPrice = json.GetItemResponse.Item.SellingStatus.CurrentPrice;
    
        var document = { 
        	method: 'POST',
          	url: 'http://172.31.0.184:8080/api/itemUpdate',
          	headers: { 
        		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
             	'Cache-Control': 'no-cache',
             	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
             	'Content-Type': 'application/json' 
        	},
        	json: true,
        	body: {
        	  timestamp: timestamp,
              quantity: quantity,
              quantitySold: quantitySold,
              price: currentPrice,
              source:"eBay",
              allInfo: json,
              item: item,
              product: product,
              seller: seller
        	}
        };
        return document;
    }
};

function GetItems(page){
    var document = { 
        method: 'GET',
          url: 'http://172.31.0.184:8080/api/items/'+page,
          headers: { 
        		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
             	'Cache-Control': 'no-cache',
             	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
             	'Content-Type': 'application/json' 
        },
        json: true,
        body: {
        }
    };
    return document;
};

function GetEbayItemUpdate(itemID){
    var document = { 
        method: 'POST',
          url: 'http://172.31.0.184:8080/api/ebay/itemUpdate/'+itemID,
          headers: { 
        		'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
             	'Cache-Control': 'no-cache',
             	'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
             	'Content-Type': 'application/json' 
        },
        json: true,
        body: {}
    };
    return document;
}

module.exports = {
	SaveItem,
	SaveItemUpdate,
	GetItems,
	GetEbayItemUpdate
};