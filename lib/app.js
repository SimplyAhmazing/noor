var domready = require('domready');
var $ = jQuery = require('jQuery');
var utils = require('./lib/utils');
var tokenize = require('./lib/tokenize').tokenize;
var parse = require('./lib/parse').parse;


function stdout (text) {
  var now = new Date()
  var timeStamp = now.getHours() + ":" + now.getMinutes();
  var $PS = $('<div>').text(timeStamp).attr('id', 'PS');
  var $res = $('<div>').css("display", "block").text(text);

  $('#result').append($PS);
  $('#result').append($res);
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
