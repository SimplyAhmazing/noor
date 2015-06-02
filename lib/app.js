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


/* Parses a program text and isolates quote wrapped strings into their
 * own array cell
 */
function findStrings(text) {
  var stringTokenizedData = [];

  var thisString = "";
  var nonString = "";
  var i = 0;

  while (i < text.length) {
    // Check if this is the start of a string
    if (text[i] == '"' || text[i] =="'") {
      if (nonString) {
        stringTokenizedData.push(nonString);
        nonString = "";
      }
      thisString += text[i]; // Start saving the string
      i++;  // Increment counter

      // Start consuming the entire string
      while ((text[i] !== '"' || text[i] !== "'") && (i < text.length)) {
        thisString += text[i];
        i++;
      }

      //We're done consuming the string, save this as a token and move on
      stringTokenizedData.push(thisString);
      thisString = "";
    } else {
      nonString += text[i];
      i++;
    }
  }
  stringTokenizedData.push(nonString); // In case line has no strings
  return stringTokenizedData;
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


      // Split strings into their own cells
      var stringTokenizedData = findStrings(line);

      // split line on spaces and parens
      var wordsInLine = [];
      stringTokenizedData.forEach(function(text) {
        if (utils.hasQuotes(text)) {
          wordsInLine.push(text);
          return;
        }
        text.split(/(\s+)/g).forEach(function(ttext) {
          wordsInLine.push(ttext)
        });
      })

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



    // MATCH FOR A STRING
    // arabicString = word.match(/("[\u0600-\u06FF]+")/g);
    if (utils.hasQuotes(word)) {
      tokens.push(["STRING", word])
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
  var AST = {}
  // console.log(JSON.stringify(AST));
  return AST;
}


function eval(AST) {
}

function getSourceCodeFromEditor() {
  return $('#text-input').val()
}

function setupButtons() {
  $('#run').on('click', function(e) {
    parse(tokenize(getSourceCodeFromEditor()));
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
