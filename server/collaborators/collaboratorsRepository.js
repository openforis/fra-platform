const db = require('../db/db')
const {fetchCountryUsers} = require('./../user/userRepository')

const {collaborator} = require('./../../common/countryRole')

const fetchCollaborators = async countryIso => {
  const countryUsers = await fetchCountryUsers(countryIso)
  const collaborators = countryUsers.filter(u => u.role === collaborator.role)

  return collaborators
}

module.exports = {
  fetchCollaborators
}
