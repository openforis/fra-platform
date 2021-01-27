import * as R from 'ramda'
// @ts-ignore
import * as camelize from 'camelize'

export const profilePictureUri = (userId: any) => `/api/users/user/${userId}/profilePicture`

export const i18nUserRole = (i18n: any, role: any, count = 1) =>
  i18n.t(`user.roles.${camelize(role.toLowerCase())}`, { count })

// validation methods
export const validName = (user: any) => !R.isEmpty(user.name)
export const validRole = (user: any) => !R.isEmpty(user.roles)

export const validEmail = (user: any) => {
  // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /.+@.+/
  return re.test(user.email)
}

// max 1Mb
export const validProfilePicture = (user: any) => !user.profilePicture || user.profilePicture.size <= 1000000

export const validateFields = (user: any) => ({
  name: { valid: validName(user) },
  email: { valid: validEmail(user) },
  role: { valid: validRole(user) },
  profilePicture: { valid: validProfilePicture(user) },
})

export const validate = (user: any) => {
  const fields = validateFields(user)
  // @ts-ignore
  const valid = R.keys(fields).every((field: any) => fields[field].valid)
  return {
    ...fields,
    valid,
  }
}

// user types
export const userType = {
  google: 'google',
  local: 'local',
}

// at least 6 chars, 1 lower case, 1 upper case and 1 number
export const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)
export const validPassword = (password: any) => passwordRegex.test(password)

export default {
  profilePictureUri,
  i18nUserRole,
  validate,
  validEmail,
  userType,
  validPassword,
}
