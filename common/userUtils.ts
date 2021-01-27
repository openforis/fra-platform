// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')

const profilePictureUri = (userId: any) => `/api/users/user/${userId}/profilePicture`

const i18nUserRole = (i18n: any, role: any, count = 1) =>
  i18n.t(`user.roles.${camelize(role.toLowerCase())}`, { count })

// validation methods
const validName = (user: any) => !R.isEmpty(user.name)
const validRole = (user: any) => !R.isEmpty(user.roles)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validEmail... Remove this comment to see the full error message
const validEmail = (user: any) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

// max 1Mb
const validProfilePicture = (user: any) => !user.profilePicture || user.profilePicture.size <= 1000000

const validateFields = (user: any) => ({
  name: { valid: validName(user) },
  email: { valid: validEmail(user) },
  role: { valid: validRole(user) },
  profilePicture: { valid: validProfilePicture(user) },
})

const validate = (user: any) => {
  const fields = validateFields(user)
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const valid = R.keys(fields).every((field: any) => fields[field].valid)
  return {
    ...fields,
    valid,
  }
}

// user types
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userType'.
const userType = {
  google: 'google',
  local: 'local',
}

// at least 6 chars, 1 lower case, 1 upper case and 1 number
const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validPassw... Remove this comment to see the full error message
const validPassword = (password: any) => passwordRegex.test(password)

module.exports = {
  profilePictureUri,
  i18nUserRole,
  validate,
  validEmail,
  userType,
  validPassword,
}
