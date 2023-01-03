
exports.passwordRemove = (users) => {
  if (Array.isArray(users)) {
    return users.map(user => {
      let newUser = ({ ...user });
      delete newUser.password
      return newUser;
    });
  }

  let newUser = ({ ...users });
  delete newUser.password;
  return newUser;
}

exports.remover = (items, toBeRemove) => {
  if (Array.isArray(items)) {
    return items.map(item => {
      let newItems = ({ ...item });
      delete newItems[toBeRemove];
      return newItems;
    });
  }

  let newItems = ({ ...items });
  delete newItems[toBeRemove];
  return newItems;
}