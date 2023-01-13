
const { remover } = require('../../utils/remover');
const { serviceReturn } = require('../../utils/response');
const User = require('../models/UsersModel');

exports.NewUsersService = async (newUser) => {

  const userAlreadyExist = await User.findOne({ username: newUser.username });
  if (userAlreadyExist) return serviceReturn(`Username '${newUser.username}' already exist`, {}, false);

  const saved = await User.save(newUser);
  if (saved) return serviceReturn(`User created succesfully`, saved, true);
  return serviceReturn(`The user ${newStory.id} failed to save`, {}, false);
}

exports.AllUsersService = async () => {

  const userList = await User.findAll();
  if (userList.length > 0) {
    const userListWithoutPass = remover(userList, 'password');
    return serviceReturn(`User list`, userListWithoutPass, true);
  }
  return serviceReturn(`User list is empty`, [], true);
}

exports.UsersServiceById = async (id, withPassword = false) => {

  const user = await User.findOne({ id });
  if (user) {
    if (withPassword) {
      return serviceReturn(`User ${id}`, user, true);
    } else {
      const userWithoutPassword = remover(user, 'password');
      return serviceReturn(`User ${id}`, userWithoutPassword, true);
    }
  }
  return serviceReturn(`User ${id} doesn't exist`, {}, false);
}

exports.ModifyUsersService = async (newUser) => {

  const userUpdated = await User.findOneAndUpdate({ id: newUser.id }, newUser);
  if (userUpdated) {
    const userUpdatedNoPass = remover(userUpdated);
    return serviceReturn(`User ${newUser.id} updated`, userUpdatedNoPass, true);
  }
  return serviceReturn(`Couldn't update user`, {}, false);
}

exports.UserDeleteByIdService = async (id) => {

  const userById = await User.deleteOne(id);
  if (userById.affectedRows > 0) return serviceReturn(`User ${id} deleted`, {}, true);
  return serviceReturn(`User ${id} doesn't exist`, {}, false);
}
