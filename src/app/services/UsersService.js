const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const { passwordRemove } = require('../../utils/passwordRemover');

exports.NewUsersService = async (newUser) => {

  const userAlreadyExist = await UsersBrainstorming.findOne({ username: newUser.username });
  if (userAlreadyExist) return response(`Username '${newUser.username}' already exist`, 200, {});

  const userList = await UsersBrainstorming.find();
  const newMaxId = userList.length + 1;
  const user = createUsers(newMaxId, newUser);
  user.save();

  return response(`User created succesfully`, 200, user);
}

exports.AllUsersService = async () => {

  const userList = await UsersBrainstorming.find();
  if (userList.length > 0) {
    const userListWithoutPass = passwordRemove(userList);
    return response(`User list`, 200, userListWithoutPass);
  }

  return response(`User list is empty`, 200);
}

exports.UsersServiceById = async (id) => {

  const user = await UsersBrainstorming.findOne({ id: id });

  if (user) {
    const userWithoutPassword = passwordRemove(user);
    return response(`User ${id}`, 200, userWithoutPassword);
  }

  return response(`User ${id} doesn't exist`, 200, {});
}
