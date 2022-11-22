const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { logInResponse } = require('../../utils/response');
const { remover } = require('../../utils/remover');

exports.LoginService = async (user, res) => {

  const userExist = await UsersBrainstorming.findOne({ username: user.username });

  if (userExist) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
      time: Date(),
      userId: userExist._id,
    };
    const token = jwt.sign(data, jwtSecretKey);
    const userWithoutPass = remover(userExist, 'password');

    return logInResponse(`Correct login user ${user.username}`, res, 200, token, userWithoutPass);
  }

  return logInResponse(`User ${user.username} doesn't exist`, res, 200);
}
