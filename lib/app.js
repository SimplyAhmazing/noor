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


function getLines(programText) {
  return programText.split(/\n|\r|\r\n/g);
}

function getWords(programLines) {
  var words = [];
  var specialChars = ['+', '-', '/', '*', '(', ')', '&&',
                      '==', '>=', '<=', '<', '>', '!'];

  for (var i in programLines) {
    line = programLines[i];

    // Pad special chars with space
    specialChars.forEach(function(specialChar) {
      line = line.replace(specialChar, " " + specialChar + " ");
    });

    // split line on spaces and parens
    var wordsInLine = line.split(/(\s+)/g);

    wordsInLine.forEach(function(word) {
      // Skip empty lines
      if (word.trim().length === 0) { return; }
      words.push(word);
    });

    words.push("\n");
  }
  return words;
}


function tokenize(programText) {
  var tokens = [];
  var words = getWords(getLines(programText));

  for (var i in words) {
      var word = words[i];

      // MATCH FOR A NUMBER
      number = word.match(/[٠١٢٣٤٥٦٧٨٩]+/g);
      if (number) {
        tokens.push(["NUMBER", utils.convertToEnglishNum(number[0])])
        continue;
      }

      // MATCH FOR ARABIC WORDS (or letters)
      // these become identifiers for variables/functions
      arabicWord = word.match(/([\u0600-\u06FF]+)/g);
      if (arabicWord) {
        tokens.push(["IDENTIFIER", arabicWord[0]])
        continue;
      }

      tokens.push([word, word]);
  }

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
