const { isIdInteger } = require('./inputsValidator');
const { tokenValidator } = require('./tokenValidator');
const { response } = require('./response');

exports.isIdAndTokenValid = (id, token, res) => {

  if (!tokenValidator(token)) return response('Unauthorized', res, 401);
  if (!isIdInteger(id)) return response('Incorrect id number', res, 400);
  return true;
}

exports.isTokenValid = (token, res) => {

  if (!tokenValidator(token)) return response('Unauthorized', res, 401);
  return true;
}
