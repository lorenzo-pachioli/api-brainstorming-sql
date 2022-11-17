const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

function passwordRemove(users) {
  if (Array.isArray(users)) {
    return users.map(user => {
      return {
        _id: user._id,
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  }
  return {
    _id: users._id,
    id: users.id,
    email: users.email,
    username: users.username
  }
}

exports.NewUsersService = async (newUser, res) => {

  try {
    const userAlreadyExist = await UsersBrainstorming.findOne({ username: newUser.username });
    if (userAlreadyExist) return response(`Username '${newUser.username}' already exist`, 200, res, {});

    const userList = await UsersBrainstorming.find();
    const newMaxId = userList.length + 1;
    const user = createUsers(newMaxId, newUser);
    user.save();

    return response(`User created succesfully`, 200, res, user);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save epic`, 503, res);
  }
}

exports.AllUsersService = async (res) => {

  try {
    const userList = await UsersBrainstorming.find();
    if (userList.length > 0) {
      const userListWithoutPass = passwordRemove(userList);
      return response(`User list`, 200, res, userListWithoutPass);
    }

    return response(`User list is empty`, 200, res);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get users list`, 503, res);
  }
}

exports.UsersServiceById = async (id, res) => {

  try {
    const user = await UsersBrainstorming.findOne({ id: id });

    if (user) {
      const userWithoutPassword = passwordRemove(user);
      return response(`User ${id}`, 200, res, userWithoutPassword);
    }

    return response(`User ${id} doesn't exist`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get user ${id}`, 503, res);
  }
}
