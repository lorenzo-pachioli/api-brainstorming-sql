const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { logInResponse } = require('../../utils/response');
const { passwordRemove } = require('../../utils/passwordRemover');

exports.LoginService = async (user) => {

  const userExist = await UsersBrainstorming.findOne({ username: user.username });

  if (userExist) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
      time: Date(),
      userId: userExist.id,
    };
    const token = jwt.sign(data, jwtSecretKey);
    const userWithoutPass = passwordRemove(userExist);

    return logInResponse(`Correct login user ${user.username}`, 200, token, userWithoutPass);
  }

  return logInResponse(`User ${user.username} doesn't exist`, 200);
}
