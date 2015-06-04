var domready = require('domready');
var $ = jQuery = require('jQuery');
var utils = require('./lib/utils');
var tokenize = require('./lib/tokenizer').tokenize;
var parse = require('./lib/parser').parse;
var interpret = require('./lib/interpreter').interpret;

var createScope = require('./lib/scope').createScope;
// var setInScope = require('./scope').setInScope;
// var getFromScope = require('./scope').getFromScope;




function stdout (text) {
  var now = new Date()
  var timeStamp = now.getHours() + ":" + now.getMinutes();
  var $PS = $('<div>').text(timeStamp + " >>").attr('id', 'PS');
  var $res = $('<div>').css("display", "block").text(text);

  $('#result').append($PS);
  $('#result').append($res);
}


function getSourceCodeFromEditor() {
  return $('#text-input').val();
}


function setupButtons() {
  $('#run').on('click', function(e) {
    var scope = createScope();
    interpret(parse(tokenize(getSourceCodeFromEditor())), scope);
    debugger;
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
