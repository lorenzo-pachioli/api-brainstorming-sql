const { LoginService } = require('../services/LoginService');
const { response } = require('../../utils/response');

exports.LoginController = (body, res) => {

  if (body.username.length < 4) return response('Incorrect username length', 401, res);
  if (body.password.length < 4) return response('Incorrect password length', 401, res);

  const user = {
    username: body.username,
    password: body.password
  }

  LoginService(user, res);
}
