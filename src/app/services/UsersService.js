const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const { passwordRemove } = require('../../utils/passwordRemover');

exports.NewUsersService = async (newUser, res) => {

  const userAlreadyExist = await UsersBrainstorming.findOne({ username: newUser.username });
  if (userAlreadyExist) return response(`Username '${newUser.username}' already exist`, res, 200, {});

  const userList = await UsersBrainstorming.find();
  const newMaxId = userList.length + 1;
  const user = createUsers(newMaxId, newUser);
  user.save();

  return response(`User created succesfully`, res, 200, user);
}

exports.AllUsersService = async (res) => {

  const userList = await UsersBrainstorming.find();
  if (userList.length > 0) {
    const userListWithoutPass = passwordRemove(userList);
    return response(`User list`, res, 200, userListWithoutPass);
  }

  return response(`User list is empty`, res, 200);
}

exports.UsersServiceById = async (id, res) => {

  const user = await UsersBrainstorming.findOne({ id: id });

  if (user) {
    const userWithoutPassword = passwordRemove(user);
    return response(`User ${id}`, res, 200, userWithoutPassword);
  }

  return response(`User ${id} doesn't exist`, res, 200, {});
}
