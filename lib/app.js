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
  var programLines = programText.split("\n\r");

  for (var i in programLines) {
    line = programLines[i];
    tokens.push(["NEWLINE", "\n"]);

    // split line on spaces and parens
    var wordsInLine = line.split(/(\s+|\(|\))/g);
    for (var j in wordsInLine) {
      var word = wordsInLine[j];
      if (word.trim().length === 0) { continue };

      // MATCH FOR A NUMBER
      number = word.match(/[٠١٢٣٤٥٦٧٨٩]+/g);
      if (number) {
        tokens.push(["NUMBER", utils.convertToEnglishNum(number[0])])
        continue;
      }

      tokens.push(["IDENTIFIER", word])
      }

  }
    // var i = 0;
    // while (i < programText.length) {
    // }

  // for (var i in programLines) {
  //   line = programLines[i];

  //   // Checking for an assigment expression
  //   if (line.indexOf('=') > -1) {
  //     var type, value = null;

  //     var _line = line.split('=');
  //     var indentifierSide = _line[0].trim();
  //     var valueSide = _line[1].trim();

  //     if (valueSide.startsWith('"') && valueSide.endsWith('"')) {
  //       tokens.push({
  //         'type': 'string',
  //         'name': identifierSide,
  //         'value': value
  //       });
  //       continue
  //     }
  //     var engNum = utils.convertToEnglishNum(valueSide);
  //     if (!isNaN(engNum)) {
  //       tokens.push({
  //         'type': 'number',
  //         'name': indentifierSide,
  //         'value': engNum
  //       });
  //       continue
  //     }
  //   }

  // }
  console.log(JSON.stringify(tokens));
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
