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


module.exports.convertToArabicNum = convertToEnglishNum;
module.exports.convertToEnglishNum = convertToEnglishNum;
