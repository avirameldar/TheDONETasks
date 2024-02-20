const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name };
  const user = {
    ...rawUser,
    name,
  };

  return user;
};

module.exports = normalizeUser;
