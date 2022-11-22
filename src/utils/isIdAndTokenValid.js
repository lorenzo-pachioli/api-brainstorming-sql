const { isIdInteger } = require('./inputsValidator');
const { tokenValidator } = require('./tokenValidator');
const { response } = require('./response');

exports.isIdAndTokenValid = (id, token, res) => {
  const userId = tokenValidator(token);
  if (!userId) return response('Unauthorized', res, 401);
  if (!isIdInteger(id)) return response('Incorrect id number', res, 400);
  return userId;
}

exports.isTokenValid = (token, res) => {
  const userId = tokenValidator(token);
  if (!userId) return response('Unauthorized', res, 401);
  return userId;
}
