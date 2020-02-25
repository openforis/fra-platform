const { getLatestSchemaVersion } = require('./versioningRepository')
const Request = require('../utils/requestUtils')

const defaultSchema = 'public'

// Return correct schema name
// Used for public views
// 1. Check if user exists
// 2a. User exits: Return default schema name ('live version')
// 2b. User doesn't exist: Return latest schema version ('frozen version')
const getDatabaseSchema = async (req) => {
  const user = Request.getUser(req)
  if (user) {
    return defaultSchema
  }

  // Destruct array => object => string
  const [{schemaName}] = await getLatestSchemaVersion()
  return schemaName
}

module.exports = {
  getDatabaseSchema
}
