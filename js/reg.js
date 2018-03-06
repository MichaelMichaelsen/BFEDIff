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

function MUSamletFastEjendom(testenv, bfe, etype, id) {
   if (etype == 'SFE') {
      metode    = "/SamletFastEjendom";
      parameter = "&SFEBFEnr=" + bfe;
   };
   if (etype == 'EJER') {
      metode    = "/Ejerlejlighed";
      parameter = "&BFEnr=" + bfe;
   };
   if (etype == 'BPFG') {
      metode    = "/BygningPaaFremmedGrund";
      parameter = "&BFEnr=" + bfe;
   };

   //console.log(bfe);
   url = testenv.endpoint +
         mu +
         metode +
         format +
         "&username=" + testenv.logins.MU.username +
         "&password=" + testenv.logins.MU.password +
         parameter;
   console.log(url);
   $.getJSON(url, function(json) {
     jsobject = JSON.stringify(json, undefined, 2);
     //console.log(jsobject);
     if (id) {
       $(id).text(jsobject);
     }
   })
   .error(function() {
     return null;}
   );
}

function EBREjendomsbeliggenhed(testenv, bfe, id) {
   metode = "/Ejendomsbeliggenhed";
   //console.log("EBR:"+bfe);
   url = testenv.endpoint +
         ebr +
         metode +
         format +
         "&username=" + testenv.logins.EBR.username +
         "&password=" + testenv.logins.EBR.password +
         "&BFEnr=" + bfe;
   console.log("EBR:"+url);
   $.getJSON(url, function(json) {
     jsobject = JSON.stringify(json, undefined, 2);
     console.log(jsobject);
     $(id).text(jsobject);
   });
}
