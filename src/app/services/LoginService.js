const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');

exports.LoginService = async (user, res) => {

  try {
    const userExist = await UsersBrainstorming.findOne({ username: user.username });

    if (userExist) {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date(),
        userId: userExist.id,
      };

      const token = jwt.sign(data, jwtSecretKey);
      return res.status(200).json({
        msj: `correct login user ${user.username}`,
        token: token
      });
    }

    return res.status(200).json({
      msj: `User ${user.username} doesn't exist`,
      token: ""
    });

  } catch (err) {
    console.log('error', err);
    res.status(503).json({
      msj: `Couldn't login`,
      content: []
    });
  }
}
