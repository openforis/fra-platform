const { roleForCountry } = require('./countryRole')

module.exports.allowedToChangeRoles = (countryIso, userInfo) =>  {
  const role = roleForCountry(countryIso, userInfo)
  if (role.role === 'ADMINISTRATOR') return ['REVIEWER', 'NATIONAL_CORRESPONDENT', 'COLLABORATOR']
  if (role.role === 'NATIONAL_CORRESPONDENT') return ['COLLABORATOR']
  return []
}
