const { LoginService } = require('../services/LoginService');
const { response, next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.LoginController = (body) => {
  console.log(body);
  if (body.username.length < 4) return response('Incorrect username length', 401);
  if (body.password.length < 4) return response('Incorrect password length', 401);

  const user = {
    username: body.username,
    password: body.password
  }

  LoginService(user).catch(() => next(newError(`Couldn't login`, 500)));
}
