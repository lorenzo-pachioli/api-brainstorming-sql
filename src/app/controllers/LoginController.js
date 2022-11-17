const { LoginService } = require('../services/LoginService');
const { response } = require('../../utils/response');

exports.LoginController = (body) => {

  if (body.username.length < 4) return response('Incorrect username length', 401);
  if (body.password.length < 4) return response('Incorrect password length', 401);

  const user = {
    username: body.username,
    password: body.password
  }

  LoginService(user);
}
