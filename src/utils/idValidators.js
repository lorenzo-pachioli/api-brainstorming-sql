exports.isIdInteger = (id) => {
  const idToNumber = Number(id);

  if (idToNumber <= 0 || !Number.isInteger(idToNumber)) {
    return false;
  }

  return true;
}