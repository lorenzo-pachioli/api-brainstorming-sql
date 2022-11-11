const jwt = require('jsonwebtoken');

exports.LoginService = (user, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.status(200).json({
    msj: `correct login user ${user.username}`,
    token: token
  });
}
