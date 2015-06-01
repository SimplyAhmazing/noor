var domready = require('domready');
var $ = jQuery = require('jQuery');
var utils = require('./lib/utils');


function stdout (text) {
  var now = new Date()
  var timeStamp = now.getHours() + ":" + now.getMinutes();
  var $PS = $('<div>').text(timeStamp).attr('id', 'PS');
  var $res = $('<div>').css("display", "block").text(text);

  $('#result').append($PS);
  $('#result').append($res);
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
      var engNum = utils.convertToEnglishNum(valueSide);
      if (!isNaN(engNum)) {
        tokens.push({
          'type': 'number',
          'name': indentifierSide,
          'value': engNum
        });
        continue
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
