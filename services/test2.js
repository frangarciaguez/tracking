const request = require('request');

var itemOptions = { method: 'POST',
  url: 'http://localhost:3977/api/item',
  headers: 
   { 'Postman-Token': 'bd837139-b8d2-4219-b69a-1bb78c492dd9',
     'Cache-Control': 'no-cache',
     Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjI2MTM0YTczN2RlYzBlMzQ0NWQ3MDkiLCJuYW1lIjoiRnJhbiIsInN1cm5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImZyYW5nYXJjaWFndWV6QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNTI5MjI0MDcyLCJleHAiOjE1MzE4MTYwNzJ9.g97Gh7ctRy_R53Fj2kEu9AC1Vrf9NX9_bvYju0H5fNU',
     'Content-Type': 'application/json' },
  body: 
   { title: 'Original Xiaomi Mi Band 2 Reloj Inteligente desde españa',
     url: 'https://www.ebay.es/itm/Original-Xiaomi-Mi-Band-2-Reloj-Inteligente-desde-espana/253681439959?_trkparms=aid%3D111001%26algo%3DREC.SEED%26ao%3D1%26asc%3D20160908105057%26meid%3D38cee5f43b254985863e263174699543%26pid%3D100675%26rk%3D4%26rkt%3D15%26sd%3D382167309670%26itm%3D253681439959&_trksid=p2481888.c100675.m4236&_trkparms=pageci%3Abcc40357-7251-11e8-acb9-74dbd180d4e8%7Cparentrq%3A0ebca6e61640ab6a8138a4aafff4ba72%7Ciid%3A1',
     category: 'Relojes inteligentes',
     allInfo: 'The rest of the info...',
     source: 'eBay',
     externalID: '253681439959',
     mainPicture: 'null',
     product: '5b2fb6f1abe6ca03e6287c9f',
     seller: '5b26dbebe9d74002022d39c7' },
  json: true };

request(itemOptions, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});