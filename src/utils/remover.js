
exports.passwordRemove = (users) => {
  if (Array.isArray(users)) {
    return users.map(user => {
      let newUser = ({ ...user }._doc);
      delete newUser.password
      return newUser;
    });
  }

  let newUser = ({ ...users }._doc);
  delete newUser.password;
  return newUser;
}

exports.remover = (items, toBeRemove) => {
  if (Array.isArray(items)) {
    return items.map(item => {
      let newItems = ({ ...item }._doc);
      delete newItems[toBeRemove]
      return newItems;
    });
  }

  let newItems = ({ ...items }._doc);
  delete newItems[toBeRemove];
  return newItems;
}