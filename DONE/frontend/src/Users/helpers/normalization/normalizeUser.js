const normalizeUser = (user) => ({
  name: {
    first: user.first,
    last: user.last,
  },
  email: user.email,
  password: user.password,
});

export default normalizeUser;
