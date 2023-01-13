const jwt = require('jsonwebtoken');
const { remover } = require('../../utils/remover');
const { serviceReturn } = require('../../utils/response');
const User = require('../models/UsersModel');
const env = require('dotenv')

exports.LoginService = async (user) => {

  const userExist = await User.findOne({ username: user.username });

  if (userExist) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || env.JWT_SECRET_KEY
    const data = {
      time: Date(),
      userId: userExist.id,
    };
    const token = jwt.sign(data, jwtSecretKey);
    const userWithoutPass = remover(userExist, 'password');
    const response = {
      token,
      user: userWithoutPass
    };
    return serviceReturn(`Correct login user ${user.username}`, response, true);
  }
  return serviceReturn(`User ${user.username} doesn't exist`, {}, false);
}
