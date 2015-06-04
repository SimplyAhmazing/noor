function createScope(parent) {
  var scope = { __parent__: parent};

  scope["اطبع"] = function (data){
    console.log(data);
  }
  return scope;
}


function setInScope(scope, key, val) {
  scope[key] = val;
  return;
}


function getFromScope(scope, key) {
  if (key in scope) {
    return scope[key];
  } else if ( !scope.__parent__) {
    return scope.__parent__[k];
  }
}


module.exports.createScope = createScope;
module.exports.setInScope = setInScope;
module.exports.getFromScope = getFromScope;
