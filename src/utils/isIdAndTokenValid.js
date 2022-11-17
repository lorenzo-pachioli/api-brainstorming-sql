const { isIdInteger } = require('./inputsValidator');
const { tokenValidator } = require('./tokenValidator');
const { response } = require('./response');

exports.isIdAndTokenValid = (id, token) => {

  if (!tokenValidator(token)) return response('Unauthorized', 401);
  if (!isIdInteger(id)) return response('Incorrect id number', 401);
  return true;
}

exports.isTokenValid = (token) => {

  if (!tokenValidator(token)) return response('Unauthorized', 401);
  return true;
}
