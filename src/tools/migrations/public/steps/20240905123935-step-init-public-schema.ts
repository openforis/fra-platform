import { DB } from 'server/db/db'
import { DDL } from 'server/db/repository/public/ddl'

export default async (): Promise<void> => {
  await DB.query(DDL.getCreatePublicSchemaDDL())
}
