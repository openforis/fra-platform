const R = require("ramda")

const camelize = require('camelize')

const crypto = require('crypto')

const emailHash = email => crypto.createHash('md5').update(email).digest('hex')

const i18nUserRole = (i18n, role) => i18n.t('user.roles.' + camelize(role.toLowerCase()))

// validation methods
const validName = user => !R.isEmpty(user.name)
const validRole = user => !R.isEmpty(user.roles)

const validEmail = user => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

//max 1Mb
const validProfilePicture = user => !user.profilePicture || user.profilePicture.size <= 1000000

const validateFields = user => ({
  name: {valid: validName(user)},
  email: {valid: validEmail(user)},
  role: {valid: validRole(user)},
  profilePicture: {valid: validProfilePicture(user)}
})

const validate = user => {
  const fields = validateFields(user)
  const valid = R.keys(fields).every(field => fields[field].valid)
  return {
    ...fields,
    valid
  }
}

module.exports = {
  emailHash,
  i18nUserRole,
  validate
}
