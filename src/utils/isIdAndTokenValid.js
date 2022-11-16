const { isIdInteger } = require('./idValidators');
const { tokenValidator } = require('./tokenValidator');
const { response } = require('./response');

exports.isIdAndTokenValid = (id, token, res) => {

  if (!tokenValidator(token)) return response('Unauthorized', 401, res);
  if (!isIdInteger(id)) return response('Incorrect id number', 401, res);
  return true;
}

exports.isTokenValid = (token, res) => {

  if (!tokenValidator(token)) return response('Unauthorized', 401, res);
  return true;
}
