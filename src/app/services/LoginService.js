const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { response, next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.LoginService = async (user) => {

  try {
    const userExist = await UsersBrainstorming.findOne({ username: user.username });

    if (userExist) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const data = {
        time: Date(),
        userId: userExist.id,
      };
      const token = jwt.sign(data, jwtSecretKey);

      return response(`Correct login user ${user.username}`, 200, token);
    }

    return response(`User ${user.username} doesn't exist`, 200, "");

  } catch (err) {
    next(newError(`Couldn't login`, 500));
  }
}
