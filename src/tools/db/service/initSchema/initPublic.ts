import { DB } from 'server/db/db'
import { DDL } from 'server/db/repository/public/ddl'

export const initPublic = async (): Promise<void> => {
  await DB.query(DDL.getCreatePublicSchemaDDL())
}
