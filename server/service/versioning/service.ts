import { getLatestSchemaVersion } from '../../repository/versioning/versioningRepository'
import * as Request from '../../utils/requestUtils'

const defaultSchema = 'public'
// Return correct schema name
// Used for public views
// 1. Check if user exists
// 2a. User exits: Return default schema name ('live version')
// 2b. User doesn't exist: Return latest schema version ('frozen version')
export const getDatabaseSchema = async (req: any) => {
  const user = (Request as any).getUser(req)
  if (user) {
    return defaultSchema
  }
  const schemaName = await getLatestSchemaVersion()
  return schemaName
}
export default {
  getDatabaseSchema,
}
