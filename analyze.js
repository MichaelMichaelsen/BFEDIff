'use strict';
const fs    = require('fs');
const axios = require('axios');
const _     = require('lodash-node');
const timer = ms => new Promise( res => setTimeout(res, ms));

var bbr      = "/BBR/BBR/1/rest";
var dar      = "/DAR/DAR/1/rest";
var mu       = "/Matrikel/Matrikel/1/REST";
var ebr      = "/EBR/Ejendomsbeliggenhed/1/rest";
var format   = "?format=json";
var test03
             = {  endpoint  : "https://test03-services.datafordeler.dk",
                  logins    :
                  {
  									"BBR"		  : { "username" : "ZARWYOJNOO",  "password": "P1beS0vs.."},
  									"CVR"     : { "username" : "ATPCBEXSNP",  "password": "P1beS0vs.."},
  									"DAGI"   	: { "username" : "HGNBFKJEZE",  "password": "P1beS0vs.."},
  									"DAR"		  : { "username" : "GICPTNKBFW",  "password": "P1beS0vs.."},
  									"EBR"		  : { "username" : "KAWSVXFIJY",  "password": "P1beS0vs.."},
  									"GeoDK"		: { "username" : "KMYFCRKNBK",  "password": "P1beS0vs.."},
  									"MU"		  : { "username" : "FTXZUJOQVX",  "password": "P1beS0vs.."}
                  }
								};

var test06
             = {  endpoint  : "https://test06-services.datafordeler.dk",
                  logins    : {
  									"BBR"		  : { "username" : "ZARWYOJNOO",  "password": "P1beS0vs.."},
  									"CVR"     : { "username" : "ATPCBEXSNP",  "password": "P1beS0vs.."},
  									"DAGI"   	: { "username" : "HGNBFKJEZE",  "password": "P1beS0vs.."},
  									"DAR"		  : { "username" : "GICPTNKBFW",  "password": "P1beS0vs.."},
  									"EBR"		  : { "username" : "KAWSVXFIJY",  "password": "P1beS0vs.."},
  									"GeoDK"		: { "username" : "KMYFCRKNBK",  "password": "P1beS0vs.."},
  									"MU"		  : { "username" : "BHOHUXMFHR",  "password": "Testpw12"}
                  }
  							};

function MUSamletFastEjendom(testenv, bfe) {
   let metode = "/SamletFastEjendom";
   //console.log(bfe);
   let url = testenv.endpoint +
         mu +
         metode +
         format +
         "&username=" + testenv.logins.MU.username +
         "&password=" + testenv.logins.MU.password +
         "&SFEBFEnr=" + bfe;
   console.log(url);
   axios.get(url)
     .then(function(response) {
       //console.log(response.data);
       return response.data
     })
     .catch(error => {
       console.log(error);
       return null
     });
}

MUSamletFastEjendom(test03,'100027247');
let rawdata = fs.readFileSync('data/test06bfe.json');
let bfetable = JSON.parse(rawdata);
console.log(bfetable);
console.log(bfetable.data.length)
bfetable.data.forEach(function(row,i) {
  let bfe = row[0];
  //console.log(row[0])
  let obj3 = MUSamletFastEjendom(test03,bfe);
  let obj6 = MUSamletFastEjendom(test06,bfe);
  if (!_.isEmpty(obj3)) {
    console(i+'exists');
    bfetable.data[i][3] = 'exists'
  };
  if (!_.isEmpty(obj6)) {bfetable.data[i][4] = 'exists'};

  if(_.isEqual(obj3, obj6)) {
    console.log(bfe+' Match')
    bfetable.data[i][5] = 'Match'
  }
  else {
    console(bfe+' No match')
  }
  sleep(3000)
});

console.log(JSON.stringify(bfetable.data))
fs.writeFileSync('data/test06check.json',JSON.stringify(bfetable))
