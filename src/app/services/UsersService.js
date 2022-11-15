const UsersBrainstorming = require('../models/UsersModel');
const { callbackError } = require('../../utils/errorResponses');
const { createUsers } = require('../../utils/modelCreators');

exports.NewUsersService = async (newUser, res) => {

  try {

    const userAlreadyExist = await UsersBrainstorming.findOne({ id: newUser.id });

    if (userAlreadyExist) {
      return res.status(200).json({
        msj: `User already exist`,
        content: []
      });
    }

    const user = createUsers(1, newUser);
    user.save();
    res.status(200).json({
      msj: `User created succesfully`,
      content: user
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't save epic`,
      content: []
    });
  }
}

exports.AllUsersService = async (res) => {

  try {

    const userList = await UsersBrainstorming.find();

    if (userList.length > 0) {
      const userListWithoutPass = userList.map(user => {
        return {
          _id: user._id,
          id: user.id,
          email: user.email,
          username: user.username
        }
      });
      return res.status(200).json({
        msj: `User list`,
        content: userListWithoutPass
      });
    }

    return res.status(200).json({
      msj: `User list is empty`,
      content: []
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't get users list`,
      content: []
    });
  }
}

exports.UsersServiceById = async (id, res) => {

  try {
    const user = await UsersBrainstorming.findOne({ id: id });

    if (user) {
      const userWithoutPassword = {
        _id: user._id,
        id: user.id,
        email: user.email,
        username: user.username
      }
      return res.status(200).json({
        msj: `User ${id}`,
        content: userWithoutPassword
      });
    }

    return res.status(200).json({
      msj: `User ${id} doesn't exist`,
      content: {}
    });

  } catch (err) {
    res.status(401).json({
      msj: `Couldn't get user ${id}`,
      content: []
    });
  }
}