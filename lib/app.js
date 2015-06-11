var domready = require('domready');
var $ = jQuery = require('jQuery');
var utils = require('./lib/utils');
var tokenize = require('./lib/lexer').tokenize;
// var parse = require('./lib/parser').parse;
var parse = require('./lib/peg-parser');
var interpret = require('./lib/interpreter').interpret;

var createScope = require('./lib/scope').createScope;


function getTimeStamp() {
  var now = new Date()
  var hrs = now.getHours();
  var mins = now.getMinutes();
  var secs = now.getSeconds();

  return  (
    (hrs <= 9 ? "0" + hrs : hrs) + ":" +
    (mins <= 9 ? "0" + mins : mins) + ":" +
    (secs <= 9 ? "0" + secs : secs)
  );
}

// TODO: use handlebars or similar templating language for this kind of display
function printPS () {
  var timeStamp = utils.convertToArabicNum(getTimeStamp());
  var $PS = $('<div>').text(timeStamp).attr('id', 'PS');
  $('#result').append($PS);
  // return $PS;
}


// TODO: use handlebars or similar templating language for this kind of display
function stdout (text) {
  var $res = $('<div>')
    .css("display", "block")
    .attr('id', 'stdout')
    .text(
      utils.convertToArabicNum(text.toString())
    );
  $('#result').append($res);
}


function getSourceCodeFromEditor() {
  return $('#text-input').val();
}


function setupButtons() {
  $('#run').on('click', function(e) {
    printPS();
    var scope = createScope(null, stdout);
    interpret(parse(tokenize(getSourceCodeFromEditor())), scope);
    $('#result').append($('<br>'));
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
