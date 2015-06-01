var domready = require('domready');
var $ = jQuery = require('jQuery');


function stdout (text) {
  var now = new Date()
  var timeStamp = now.getHours() + ":" + now.getMinutes();
  var $PS = $('<div>').text(timeStamp).attr('id', 'PS');
  var $res = $('<div>').css("display", "block").text(text);

  $('#result').append($PS);
  $('#result').append($res);
}


function convertToEnglishNum(str) { // I know this is misnomer...
    return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
        return d.charCodeAt(0) - 1776;
    }) );
}

function convertToArabicNum(str) {
    return String( str.replace(/[0123456789]/g, function(d) {
        return String.fromCharCode(d.charCodeAt(0) + 1584);
    }));
}


function convertDigitIn(enDigit) { // PERSIAN, ARABIC, URDO
  var newValue="";
  for (var i=0;i<enDigit.length;i++) {
    var ch=enDigit.charCodeAt(i);
    if (ch>=48 && ch<=57) {
      // european digit range
      var newChar=ch+1584;
      newValue=newValue+String.fromCharCode(newChar);
    }
    else {
      newValue=newValue+String.fromCharCode(ch);
    }
  }
  return newValue;
}


function tokenize(programText) {
  var tokens = [];
  var programLines = programText.split("\n");

  for (var i in programLines) {
    line = programLines[i];

    // Checking for an assigment expression
    if (line.indexOf('=') > -1) {
      var type, value = null;

      var _line = line.split('=');
      var indentifierSide = _line[0].trim();
      var valueSide = _line[1].trim();

      if (valueSide.startsWith('"') && valueSide.endsWith('"')) {
        tokens.push({
          'type': 'string',
          'name': identifierSide,
          'value': value
        });
        continue
      }
      var engNum = convertToEnglishNum(valueSide);
      if (!isNaN(engNum)) {
        tokens.push({
          'type': 'number',
          'name': indentifierSide,
          'value': engNum
        });
      }
    }
  }
  console.log(tokens);
  return tokens;
}


function parse(tokens) {
  /* Take list of tokens and return an ABS
   */
  return [];
}


function eval(AST, stdout) {
}

function setupButtons() {
  $('#run').on('click', function(e) {
    tokenize($('#text-input').val());
  });

  $('#save').on('click', function(e) {
    localStorage.setItem('program', $('#text-input').val());
  });

  $('#load').on('click', function(e) {
    $('#text-input').val(localStorage.getItem('program'));
  });
}

domready(function(){
  setupButtons();
});
