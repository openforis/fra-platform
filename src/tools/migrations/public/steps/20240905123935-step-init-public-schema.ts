import { DB } from 'server/db'
import { DDL } from 'server/repository/public/ddl'

export default async () => {
  await DB.query(DDL.getCreatePublicSchemaDDL())
}
