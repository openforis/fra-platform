const R = require('ramda')
const camelize = require('camelize')

const profilePictureUri = (countryIso, userId) => `/api/users/${countryIso}/user/${userId}/profilePicture`

const i18nUserRole = (i18n, role, count = 1) => i18n.t(`user.roles.${camelize(role.toLowerCase())}`, { count })

// validation methods
const validName = (user) => !R.isEmpty(user.name)
const validRole = (user) => !R.isEmpty(user.roles)

const validEmail = (user) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

// max 1Mb
const validProfilePicture = (user) => !user.profilePicture || user.profilePicture.size <= 1000000

const validateFields = (user) => ({
  name: { valid: validName(user) },
  email: { valid: validEmail(user) },
  role: { valid: validRole(user) },
  profilePicture: { valid: validProfilePicture(user) },
})

const validate = (user) => {
  const fields = validateFields(user)
  const valid = R.keys(fields).every((field) => fields[field].valid)
  return {
    ...fields,
    valid,
  }
}

// user types
const userType = {
  google: 'google',
  local: 'local',
}

// at least 6 chars, 1 lower case, 1 upper case and 1 number
const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)
const validPassword = (password) => passwordRegex.test(password)

module.exports = {
  profilePictureUri,
  i18nUserRole,
  validate,
  validEmail,
  userType,
  validPassword,
}
