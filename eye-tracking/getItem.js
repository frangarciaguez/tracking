const request = require('request');
//const JSON = require('JSON');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var id = '253491973014';
var item;

const options = {
    url: 'https://api.ebay.com/ws/api.dll',
    method: 'POST',
    body: '<?xml version="1.0" encoding="utf-8"?>\r\n<GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\r\n  <RequesterCredentials>\r\n    <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**zPyjWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADlIunCZWGoQqdj6x9nY+seQ**7i8EAA**AAMAAA**Lp54DVQhH1xkGzPhqP7EFnAUBkEPfg86Rixho5+hno6wkpQBFS94ThA3j4wHFxdDgF07wCeAaqKH3sksQqgl9Bz9FV/rRAVBmDBld4rE1SAI1Llbnw8UdMMFYWD3bLbxSL76Elx3i2ziBvV7nZI8lr36ItA14rHY1j75UC3TinIzaM43xjAnGZT3RkifXbfvBLFbY7Exsh5p2WI9D6DtdF7ShVCKjMlH35qcEyWJA8eCKLoPNaaId13u3QMS7q5pQEwINOqS8m0KuqTBGEzn3eA/U7fguPBnMNF/FBa2pIDZA1j7PLBfDR1WqJPc258EKoYtTa6QnR18zE0KkM/rG3btkh2RXX31O28EtRM7qYi2HTralS/RLP6jhHTgRlaVWg+pJ4zdviup35wRcTaY7kw+riA81gTOqlzWfufKL7/FLfcPkzdooMdCMFUYo7prAlurlZcTUiyLpElZfcOHCdTIHj7WOOoCAR2gkM4m93yneSYJFD6IFKt6t2iWBTGCBTnfnh6PBSxCsssWon7TO37vBCW+7fvFzks1zpTSDyTkfAwc7m/Fa68Sh1WudQIiRE7m0VPf0rm4Vhhw6dHTt1qI6Pmns9wJObOSK35ZNZlLJM9iRKl/2N8Gp0yvFJgO/+2M/t0MAH7HPYcFwesTraKC9Nj+By6Q+DfUXjHby30EFjWymLIGNhtxBBFeBMavBwsv5NCI6cDzozSa2MR0i1kBozdawNFCD7Av4PH6SMKWS1nRxO8FdO27hx5UjJdV</eBayAuthToken>\r\n  </RequesterCredentials>\r\n\t<ErrorLanguage>en_US</ErrorLanguage>\r\n\t<WarningLevel>High</WarningLevel>\r\n      <!--Enter an ItemID-->\r\n  <ItemID>' + id + '</ItemID>\r\n</GetItemRequest>',
    headers: {
        'Postman-Token': 'ab8e9004-fd7e-42fa-be1f-69ed3c6c40ab',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/xml',
        'X-EBAY-API-CALL-NAME': 'GetItem',
        'X-EBAY-API-COMPATIBILITY-LEVEL': '967',
        'X-EBAY-API-SITEID': '186'
    }
};

request(options, function (err, res, body) {
    //let json = JSON.parse(body);
    //console.log(json);
    console.log(body.toString());
    item = body.toString();
});

const server = http.createServer((req2, res2) => {
    res2.statusCode = 200;
    res2.setHeader('Content-Type', 'text/plain');
    res2.write(item);
    res2.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

