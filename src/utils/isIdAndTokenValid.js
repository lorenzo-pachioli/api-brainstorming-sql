const { isIdInteger } = require('./idValidators');
const { tokenValidator } = require('./tokenValidator');

exports.isIdAndTokenValid = (id, token, res) => {
  if (!tokenValidator(token)) {
    res.status(401).json({
      msj: 'Unauthorized'
    });
    return false;
  }

  if (!isIdInteger(id)) {
    res.status(400).json({
      msj: 'Incorrect id number'
    });
    return false;
  }
  return true;
}

exports.isTokenValid = (token, res) => {
  if (!tokenValidator(token)) {
    res.status(401).json({
      msj: 'Unauthorized'
    });
    return false;
  }
  return true;
}
