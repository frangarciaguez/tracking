const settings = require('../settings/ebay');

function GetItem(id){
    var document = {
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
    
    return document;
};

module.exports = {
	GetItem
};