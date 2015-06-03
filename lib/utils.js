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

var inspect = require('util').inspect;

// Taken from Mudit
function log(input, depth) {
    if ('*' !== process.env.DEBUG) return;
    if ('string' === typeof input && input.indexOf('\n') > -1) {
        console.log(input);
    } else {
        console.log(
            inspect(
                input,
                { colors: true, showHidden: false, depth: depth || null }
            ));
    }
};


module.exports.convertToArabicNum = convertToEnglishNum;
module.exports.convertToEnglishNum = convertToEnglishNum;
module.exports.hasQuotes = hasQuotes;
module.exports.log = log;
