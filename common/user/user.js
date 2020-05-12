const R = require('ramda')

const keys = {
  id: 'id',
  name: 'name',
  roles: 'roles'
}

const getId = R.prop(keys.id)
const getName = R.prop(keys.names)
const getRoles = R.propOr([], keys.roles)

module.exports = {
  getId,
  getName,
  getRoles
}
