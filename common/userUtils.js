const crypto = require('crypto')

const emailHash = email => crypto.createHash('md5').update(email).digest('hex')

module.exports.emailHash = emailHash
