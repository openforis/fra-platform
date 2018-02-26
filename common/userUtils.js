import camelize from "camelize";

const crypto = require('crypto')

const emailHash = email => crypto.createHash('md5').update(email).digest('hex')

const i18nUserRole = (i18n, role) => i18n.t('user.roles.' + camelize(role.toLowerCase()))

module.exports = {
  emailHash,
  i18nUserRole
}
