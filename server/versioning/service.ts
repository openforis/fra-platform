// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getLatestS... Remove this comment to see the full error message
const { getLatestSchemaVersion } = require('./versioningRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Request'.
const Request = require('../utils/requestUtils')

const defaultSchema = 'public'
// Return correct schema name
// Used for public views
// 1. Check if user exists
// 2a. User exits: Return default schema name ('live version')
// 2b. User doesn't exist: Return latest schema version ('frozen version')
const getDatabaseSchema = async (req: any) => {
  const user = (Request as any).getUser(req)
  if (user) {
    return defaultSchema
  }
  const schemaName = await getLatestSchemaVersion()
  return schemaName
}
module.exports = {
  getDatabaseSchema,
}
