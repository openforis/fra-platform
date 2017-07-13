module.exports.setLoggedInCookie = (res, value) =>
  res.cookie('loggedIn', value, {maxAge: 30 * 24 * 60 * 60 * 1000})
