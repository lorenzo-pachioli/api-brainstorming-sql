const { isIdInteger } = require('../../utils/idValidators');
const { tokenValidator } = require('../../utils/tokenValidator');

exports.UsersController = (token, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  res.status(200).json({
    msj: 'correct users'
  });
}

exports.UsersControllerById = (token, id, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  if (!isIdInteger(id)) {
    return res.status(400).json({
      msj: 'Incorrect id number'
    });
  }

  res.status(200).json({
    msj: 'correct users'
  });
}
