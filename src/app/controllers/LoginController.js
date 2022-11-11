const jwt = require('jsonwebtoken');

exports.LoginController = (body, res) => {

  if (body.user.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect user'
    });
  }

  if (body.password.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect password'
    });
  }

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.status(200).json({
    msj: 'correct login',
    token: token
  });
}