const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { response } = require('../../utils/response');

exports.LoginService = async (user, res) => {

  try {
    const userExist = await UsersBrainstorming.findOne({ username: user.username });

    if (userExist) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const data = {
        time: Date(),
        userId: userExist.id,
      };
      const token = jwt.sign(data, jwtSecretKey);

      return response(`Correct login user ${user.username}`, 200, res, token);
    }

    return response(`User ${user.username} doesn't exist`, 200, res, "");

  } catch (err) {
    console.log(err);
    return response(`Couldn't login`, 503, res);
  }
}
