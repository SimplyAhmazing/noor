var inspect = require('util').inspect;
var debug = require('debug');



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

function hasQuotes(text) {
    if ((text.indexOf('"') > -1) || (text.indexOf("'") > -1)) {
      return true;
    }
    return false;
}

function replaceAllEnglishNumsToArabic(text) {
    if (String.isString(text)) {
        var newText = '';
        text.forEach(function(str) {
            newText += convertToArabicNum(parseInt(str));
        });
        return newText;
    }
}


module.exports.convertToArabicNum = convertToArabicNum;
module.exports.convertToEnglishNum = convertToEnglishNum;
module.exports.hasQuotes = hasQuotes;
module.exports.logger = debug;
