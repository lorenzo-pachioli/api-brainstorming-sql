const { LoginService } = require('../services/LoginService');

exports.LoginController = (body, res) => {

  if (body.username.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect username'
    });
  }

  if (body.password.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect password'
    });
  }

  const user = {
    username: body.username,
    password: body.password
  }

  LoginService(user, res);
}
